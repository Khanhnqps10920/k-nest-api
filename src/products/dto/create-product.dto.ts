import { Category } from 'src/categories/entities/category.entity';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  imgUrl: string;

  description: string;

  @IsNotEmpty()
  quantity: number;

  categories: Category[];

  @IsNotEmpty()
  price: number;
}
