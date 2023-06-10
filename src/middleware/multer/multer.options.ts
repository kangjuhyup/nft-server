import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync , mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

const uploadPath = path.join(__dirname,'..','uploads');

 
export const multerDiskOptions = {


  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldNameSize: 200, 
    filedSize: 1024 * 1024, 
    fields: 2, 
    fileSize: 16777216, 
    files: 10,
  },
};

export const uploadFileURL = (fileName): string =>
  `http://localhost:3000/${fileName}`;