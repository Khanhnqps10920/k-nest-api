import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseGuards,
  UploadedFiles,
  NotAcceptableException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFilter, jsonResponseParsed } from 'src/common/utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ImageService } from 'src/images/images.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly imageService: ImageService,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const uploadedFile = await this.uploadService.uploadS3(file, 'image');

    const insertedImage = await this.imageService.insertOne({
      url: uploadedFile,
    });

    const responseData = jsonResponseParsed(
      200,
      {
        file: insertedImage,
      },
      'Upload file success',
    );

    return responseData;
  }

  @UseGuards(JwtAuthGuard)
  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    files.forEach((file) => {
      if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) {
        throw new NotAcceptableException('Some file does not image');
      }
    });

    const images = await this.uploadService.uploadMultipleFiles(files);

    return 'hello';
  }
}
