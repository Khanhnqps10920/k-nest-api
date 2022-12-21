import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  title: string;

  imgUrl: string;

  description: string;

  quantity: number;

  categories: Category[];
}
