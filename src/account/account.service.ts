import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtSigner } from 'src/jwt/jwt-signer.service';
import { Token } from 'src/token/token.entity';
import { Repository } from 'typeorm';
import { SigninAccountResponseDto } from './dto/account-sign-res.dto';
import { Account } from './entity/account.entity';
import { passwordCompare } from './password-compare';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly jwtSigner: JwtSigner,
  ) {}

  async create(userCrateInfo: any) {
    const isExist = await this.accountRepository.findOne({
      email: userCrateInfo.email,
    });

    userCrateInfo.telephone = userCrateInfo.telephone
      .toString()
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    if (isExist) {
      return {
        status: 'failed',
        message: '해당 이메일로 등록된 계정이 있습니다.',
      };
    }

    const createAccount = this.accountRepository.create({
      ...userCrateInfo,
    });
    const account = await this.accountRepository.save(createAccount);

    if (!account) {
      throw new InternalServerErrorException({
        status: 500,
        message: '유저가 생성이 되지 않았습니다.',
      });
    }

    return { status: 200, message: 'success' };
  }

  async login(userData: any) {
    const user = await this.accountRepository.findOne({
      where: { email: userData.email },
      relations: ["token"]
    });

    if (!user) {
      return {
        status: 'failed',
        message: '해당 이메일로 등록된 계정이 있습니다.',
      };
    }

    const result = await passwordCompare(userData.password, user.password);

    if (!result) {
      return {
        status: 400,
        message: '해당 비밀번호가 잘못되었습니다.',
      };
    }

    const token = await this.jwtSigner.sign(user.id);
    user.token.accessToken = token.accessToken;
    user.token.refreshToken = token.refreshToken;
    await this.accountRepository.save(user)

    return new SigninAccountResponseDto(user.token);
  }
}
