import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import { ConfigOptions, JwtModuleOptions } from './jwt-option';

@Injectable()
export class JwtSigner{
  constructor(
    @Inject(ConfigOptions.JWT) private readonly options: JwtModuleOptions,
  ) {}
  operate(userId: string) {
    let expiresIn = moment()
    .add(process.env.ACCESS_TOKEN_EXPIRATION, 'seconds')
    .toDate();
    const accessToken = jwt.sign({ userId, expiresIn }, this.options.privateKey);

    expiresIn = moment()
    .add(process.env.REFRESH_TOKEN_EXPIRATION, 'seconds')
    .toDate();
    const refreshToken = jwt.sign({ accessToken, userId, expiresIn}, this.options.privateKey);

    return { accessToken, refreshToken };
  }
}
