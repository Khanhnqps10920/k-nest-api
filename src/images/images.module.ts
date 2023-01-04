import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/images.entity';
import { ImageService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImagesModule {}
