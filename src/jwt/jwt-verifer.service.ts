import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { TokenInfomation } from './dto/token-infomation.dto';
import { ConfigOptions, JwtModuleOptions } from './jwt-option';
import moment from 'moment-timezone';

@Injectable()
export class JwtVerifier {
  constructor(
    @Inject(ConfigOptions.JWT) private readonly options: JwtModuleOptions,
  ) {}
  async checkVerify(accessToken: string, refreshToken: string) {
    let tokenData = jwt.verify(accessToken, this.options.privateKey);

    if (tokenData === JsonWebTokenError) {
      throw new BadRequestException({
        code: 401,
        message: '유효하지 않은 토큰',
      });
    }

    tokenData[accessToken] = accessToken
    let tokenInfomation = new TokenInfomation(tokenData)
  
    if (tokenData === TokenExpiredError || moment(tokenInfomation.expiresIn).isBefore(moment())) {
      tokenData = jwt.verify(refreshToken, this.options.privateKey); 
    };

    if (tokenData === JsonWebTokenError) {
      throw new BadRequestException({
        code: 401,
        message: '유효하지 않은 토큰',
      })
    };

    tokenInfomation = new TokenInfomation(tokenData)

    if (tokenData === TokenExpiredError || moment(tokenInfomation.expiresIn).isBefore(moment())) {
      throw new BadRequestException({
        code: 401,
        message: '토큰 유효기간 만료',
    })
  };

  if (tokenInfomation.accessToken != accessToken) {
    throw new BadRequestException({
      code: 401,
      message: '토큰이 일치하지 않습니다. 로그인 요청',
    })
  }
  
    return tokenInfomation;
  }
}
