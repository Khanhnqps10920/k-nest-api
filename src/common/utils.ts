import { MethodNotAllowedException } from '@nestjs/common';
import { Request } from 'express';

export interface FlexibleObject {
  [key: string]: any;
}

export const utils = {
  SALT: 10,
};

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 50;

export const jsonResponseParsed = (status, data, message) => {
  return {
    status,
    data,
    message,
  };
};

export const config = () => ({
  BUCKET: process.env.BUCKET,
  REGION: process.env.REGION,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
});

export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
}

export const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/)))
    callback(new Error('Some file doesnt match file type'), false);
  callback(null, true);
};
