import { HttpException, Injectable } from '@nestjs/common';
import { IImage, Image } from './entities/images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private dataSource: DataSource,
  ) {}

  async insertMany(images: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    let resolvedArr;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const promisedArr = [];
      for (const image of images) {
        const newImage = new Image();
        newImage.url = image;
        promisedArr.push(queryRunner.manager.save(newImage));
      }

      resolvedArr = await Promise.all(promisedArr);

      await queryRunner.commitTransaction();
    } catch (e) {
      console.log('error', e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return resolvedArr;
  }

  async insertOne(image: IImage) {
    const newImage = await this.imageRepository.save(image);

    if (!newImage) {
      throw new HttpException('Something went wrong', 401);
    }

    return newImage;
  }
}
