import { InternalServerErrorException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

export async function passwordCompare(
  password: string,
  dbPassword: string,
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(password, dbPassword);
    return result;
  } catch (e) {
    console.log(e);
    throw new InternalServerErrorException({
      status: 500,
      message: '비밀번호 compare에 실패하였습니다.',
    });
  }
}
