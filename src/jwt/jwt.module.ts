import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigOptions, JwtModuleOptions } from './jwt-option';
import { JwtSigner } from './jwt-signer.service';
import { JwtVerifier } from './jwt-verifer.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: ConfigOptions.JWT,
          useValue: options,
        },
        JwtSigner,
        JwtVerifier,
      ],
      exports: [JwtSigner, JwtVerifier],
    };
  }
}
