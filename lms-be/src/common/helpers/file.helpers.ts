import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { extname } from 'path';
import { Callback } from 'typeorm';
import { v4 as uuid } from 'uuid';

export const editFileName = (_req: Request, file: Express.Multer.File, callback: Callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (_req: Request, file: Express.Multer.File, callback: Callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const pdfFileFilter = (_req: Request, file: Express.Multer.File, callback: Callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(new BadRequestException('Only PDF files are allowed!'), false);
  }
  callback(null, true);
};

export const mp4FileFilter = (_req: Request, file: Express.Multer.File, callback: Callback) => {
  if (!file.originalname.match(/\.(mp4)$/)) {
    return callback(new BadRequestException('Only PDF files are allowed!'), false);
  }
  callback(null, true);
};

export const renameFile = (file: Express.Multer.File) => {
  const fileSplit = file.originalname.split('.');
  const dateToUpdate = new Date().toISOString().replace(/:/g, '-');
  const keyName =
    file.fieldname + '-' + dateToUpdate + uuid() + '.' + fileSplit[fileSplit.length - 1];
  return keyName;
};
