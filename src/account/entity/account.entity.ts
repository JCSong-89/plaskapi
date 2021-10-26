import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Core } from 'src/entity-core/core.entity';
import { Token } from 'src/token/token.entity';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({ name: 'accounts' })
export class Account extends Core {
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
  })
  telephone: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @OneToOne(() => Token, token => token.account) // specify inverse side as a second parameter
  @JoinColumn()
  token: Token;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 8);
      } catch (e) {
        throw new InternalServerErrorException({
          status: 500,
          message: '비밀번호 암호화에 실패하였습니다.',
        });
      }
    }
  }
}
