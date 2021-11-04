import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(title: string) {
    return this.productsRepository
      .createQueryBuilder()
      .where('TRIM(LOWER(title)) LIKE :title', {
        title: `%${title.toLowerCase().trim()}%`,
      })
      .getMany();
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
