import { Core } from "src/entity-core/core.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity({ name: 'tokents' })
export class Account extends Core {
  @Column({
    unique: true,
  })
  accessToken : string;
  @Column({
    unique: true,
  })
  refreshToken : string

  @Column()
  refreshUpdatedAt: Date; // 리프레시 수정일시
}