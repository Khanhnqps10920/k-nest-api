import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ImageService } from 'src/images/images.service';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [ImagesModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
