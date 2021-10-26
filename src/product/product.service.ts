import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { OrderByEnum } from './product.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createData: any, filePath: string) {
    const newProduct = this.productRepository.create({
      ...createData,
      image: filePath,
    });
    const product = await this.productRepository.save(newProduct);

    if (!product) {
      throw new InternalServerErrorException({
        status: 500,
        message: '유저가 생성이 되지 않았습니다.',
      });
    }
      return true
    //return new ProductResDto(product);
  }

  async delete(productId: string) {
    const product = await this.productRepository.findOne({ id: productId });

    if (!product) {
      throw new BadRequestException({
        status: 400,
        message: '존재하지 않는 상품입니다.',
      });
    }

    await this.productRepository.remove(product);
    return { status: 200, message: 'success' };
  }

  async findMany(
    orderBy: OrderByEnum,
    by: 'DESC' | 'ASC',
    size: number,
    page: number,
  ) {
    return await this.productRepository
      .createQueryBuilder('products')
      .orderBy(`products.${orderBy}`, by)
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
  }
}
