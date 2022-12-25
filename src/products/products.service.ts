import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FindProductsDto, ProductSortByEnum } from './dto/find-products.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  Sort,
  jsonResponseParsed,
} from '../common/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productRepository.save(createProductDto);

      return newProduct;
    } catch (e) {
      console.log('product create: ', e);
    }
  }

  async findAll(query: FindProductsDto) {
    const { search } = query;

    const page = query.page || DEFAULT_PAGE;

    const limit = query.limit || DEFAULT_LIMIT;

    let condition;

    if (search) {
      condition = [
        {
          title: Like(`%${search}%`),
        },
        {
          categories: {
            title: Like(`%${search}%`),
          },
        },
      ];
    }

    const products = await this.productRepository.findAndCount({
      where: condition,
      take: limit,
      skip: (page - 1) * limit,
      relations: ['categories'],
      order: {
        id: 'DESC',
      },
    });

    const [list, total] = products;

    const responseData = jsonResponseParsed(
      201,
      {
        data: {
          total,
          list,
          page,
        },
      },
      'Get products success',
    );

    return responseData;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', 404);
    }

    return jsonResponseParsed(200, product, 'Get Product Success');
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id,
        },
      });

      if (!product) {
        throw new HttpException('Cant not find product', 404);
      }

      const updateData = {
        ...product,
        ...updateProductDto,
      };

      const updatedProduct = await this.productRepository.save(updateData);

      return jsonResponseParsed(201, updatedProduct, 'Update product success');
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException('Cant not find product', 404);
    }

    await this.productRepository.delete(id);
    return jsonResponseParsed(201, {}, 'Delete product success');
  }
}
