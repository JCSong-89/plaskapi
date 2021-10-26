import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Matches, MinLength } from 'class-validator';

export class AccountCreateDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50})/, {message: '비밀번호에 특수문자, 숫자, 영문자를 각 한자리 이상 필요'})
  password: string;

  @ApiProperty()
  @IsInt()
  telephone: number;

  @ApiProperty()
  @IsString()
  name: string;
}
