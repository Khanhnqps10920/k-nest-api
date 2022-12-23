import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { GetCategoriesDto } from './dto/get-categories.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  jsonResponseParsed,
} from '../common/utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesRepository.save(
        createCategoryDto,
      );

      return newCategory;
    } catch (e) {
      console.log('category create: ', e);
    }
  }

  async findAll(query: GetCategoriesDto) {
    try {
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
            metaTitle: Like(`%${search}%`),
          },
          {
            slug: Like(`%${search}%`),
          },
        ];
      }

      const categories = await this.categoriesRepository.findAndCount({
        where: condition,
        take: limit,
        skip: (page - 1) * limit,
      });

      const [list, total] = categories;

      const responseData = jsonResponseParsed(
        201,
        {
          data: {
            total,
            list,
            page,
          },
        },
        'Get categories success',
      );

      return responseData;
    } catch (e) {
      console.log('category findAll: ', e);
    }
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException('Category not found', 400);
    }

    const updatedCategory = {
      ...category,
      ...updateCategoryDto,
    };

    return await this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: number) {
    await this.categoriesRepository.delete(id);
    return jsonResponseParsed(201, {}, 'Delete success');
  }
}
