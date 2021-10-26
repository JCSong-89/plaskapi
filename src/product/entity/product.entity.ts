import { Core } from '../../entity-core/core.entity'
import { Column, Entity } from 'typeorm';

@Entity('products')
export class Product extends Core {
  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  freeDeilivery: boolean;

  @Column()
  discount: number;

  @Column()
  image: string;

  @Column()
  grade: number;
}
