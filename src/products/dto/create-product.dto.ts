import { Category } from 'src/categories/entities/category.entity';
import { IsArray, IsNotEmpty, MinLength } from 'class-validator';
import { Image } from 'src/images/entities/images.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  mainImg: Image;

  description: string;

  @IsNotEmpty()
  quantity: number;

  @IsArray()
  categories: Category[];

  @IsNotEmpty()
  price: number;
}
