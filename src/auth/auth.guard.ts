import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entity/account.entity';
import { JwtSigner } from 'src/jwt/jwt-signer.service';
import { JwtVerifier } from 'src/jwt/jwt-verifer.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtVerifier: JwtVerifier,
    private readonly jwtSigner: JwtSigner,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    AuthGuard.logger.log(`Authorization: ${authorization}`);
    if (!authorization) {
      throw new UnauthorizedException({
        status: 401,
        message: '인증되지 않았습니다.',
      });
    }

    const [scheme, accessToken, refreshToken] = authorization.split(' ');
    AuthGuard.logger.log(`Scheme: ${scheme}, AccessToken: ${accessToken}, RefreshToken: ${refreshToken}`);

    if (scheme.toLowerCase() !== 'bearer') {
      throw new NotImplementedException({
        status: 501,
        message: '지원되지 않는 인증토큰 유형 입니다.',
      });
    }

    const tokenInfomation = await this.jwtVerifier.checkVerify(accessToken, refreshToken)
    const result = await this.accountRepository.findOne({
      where: { id: tokenInfomation.userId },
      relations: ["token"]
    });

    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '해당 토큰의 유저가 DB에 존재하지 않습니다.',
      });
    }

    if (result.token.accessToken != accessToken && result.token.refreshToken != refreshToken) {
      throw new UnauthorizedException({
        status: 401,
        message: '기존 발급 토큰과 같지 않습니다.',
      });
    }

    const toekn = await this.jwtSigner.sign(result.id) // token 갱신
     result.token.accessToken = toekn.accessToken;
     result.token.refreshToken = toekn.refreshToken;

    await this.accountRepository.save(result)
    request.user = result;

    return true;
  }
}
