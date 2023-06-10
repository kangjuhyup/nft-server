import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { FileFilterCallback } from 'multer';
import path from 'path';

export const uploadPath = path.join(__dirname ,'..','..', 'uploads'); // upload 폴더 경로

export const multerDiskOptions = {
  fileFilter: (_, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg)$/)) { // jpg | jpeg | png | svg 파일이 아닐경우 에러
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 'Unsupported image format',
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST, // 400 Bad Request
        ),
      );
    }
  },
  limits: {
    // fieldNameSize: 1000, // 필드 이름의 최대 길이 (바이트 단위)
    filedSize: 1024 * 1024, // 필드 데이터의 최대 크기 (바이트 단위)
    fields: 10, // 전송할 수 있는 필드의 최대 개수
    fileSize: 1000000, // 전송할 수 있는 파일의 최대 크기 (바이트 단위)
    files: 10, // 전송할 수 있는 파일의 최대 개수
  },
};

export const uploadFileURL = (fileName: string): string =>
  `http://localhost:8000${fileName}`;

export const setPath = (path:string) => {
  if(existsSync(path)) return true;
  mkdirSync(path)
  return false;
}