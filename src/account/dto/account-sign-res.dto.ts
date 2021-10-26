import { Token } from 'src/token/token.entity';

export class SigninAccountResponseDto {
  accessToken: string;
  refreshToken: string;

  constructor(signData: Token) {
    this.accessToken = signData.accessToken;
    this.refreshToken = signData.refreshToken;
  }
}
