import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
