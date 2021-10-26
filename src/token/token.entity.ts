import { Account } from 'src/account/entity/account.entity';
import { Core } from 'src/entity-core/core.entity';
import { OneToOne } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'tokents' })
export class Token extends Core {
  @Column({
    unique: true,
  })
  accessToken: string;

  @Column({
    unique: true,
  })
  refreshToken: string;


  @OneToOne(() => Account, account => account.token) // specify inverse side as a second parameter
  account: Account;
}
