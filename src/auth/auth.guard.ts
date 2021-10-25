import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtVerifier } from 'src/jwt/jwt-verifer.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtVerifier: JwtVerifier,
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
     // todo: 유저정보 확인 및  토큰 업데이트 로직 추가
     const result = 유저정보확인 tokenInfomation.userId

    if (!result) {
      throw new NotFoundException({
        status: 404,
        message: '해당 토큰의 어드민이 DB에 존재하지 않습니다.',
      });
    }

    request.user = result;

    return true;
  }
}
