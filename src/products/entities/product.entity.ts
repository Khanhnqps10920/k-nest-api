import { Category } from 'src/categories/entities/category.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { length: 500 })
  imgUrl: string;

  @Column('varchar', { length: 500 })
  description: string;

  @Column('int', { width: 200 })
  quantity: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
