import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/images.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  mainImg: Image;

  @Column('varchar', { length: 500, nullable: true })
  description: string;

  @Column('int', { width: 200, default: 0 })
  quantity: number;

  @Column('int', { width: 200, default: null, nullable: true })
  price: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @ManyToMany(() => Category, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  categories: Category[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
