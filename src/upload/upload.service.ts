import { HttpException, Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { S3 } from 'aws-sdk';
import { config } from '../common/utils';
import { uuid } from 'uuidv4';

@Injectable()
export class UploadService {
  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }

  async uploadS3(file: Express.Multer.File, type: string) {
    try {
      const { BUCKET, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = config();

      const s3 = new S3({
        region: REGION,
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
      });

      const params: S3.PutObjectRequest = {
        Bucket: BUCKET,
        Key: `upload/${type}/${uuid()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadedFile = await s3.upload(params).promise();

      if (!uploadedFile) {
        throw new Error();
      }

      return uploadedFile.Location;
    } catch (e) {
      console.log('uploadS3: ', e);
      throw new HttpException('Upload failed', 400);
    }
  }
}
