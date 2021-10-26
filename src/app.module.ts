import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, MemoryStoredFile, NestjsFormDataModule, } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './jwt/jwt.module';
import { TypeOrmConfigService } from './typeorm-config.service';

@Module({
  imports: [    
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    NestjsFormDataModule.config({ storage: FileSystemStoredFile, fileSystemStoragePath: '/images', autoDeleteFile: false }),
    Pro
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
