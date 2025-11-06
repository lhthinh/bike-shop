import { BadRequestException } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { Request } from 'express'
import _ from 'lodash'
import mime from 'mime-types'
import { diskStorage } from 'multer'
import { I18nContext } from 'nestjs-i18n'

type DestinationCallback = (
  error: BadRequestException | null,
  acceptFile: boolean,
) => void

export const multerConfig: MulterOptions = {
  limits: {
    fileSize: Math.pow(1024, 2) * 25,
    fieldSize: Math.pow(1024, 2) * 25,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) => {
    if (
      _.includes(
        [
          'xlsx',
          'xls',
          'doc',
          'docx',
          'pdf',
          'zip',
          'jpg',
          'jpeg',
          'png',
          'gif',
        ],
        mime.extension(file.mimetype),
      ) &&
      file
    ) {
      cb(null, true)
    } else {
      cb(new BadRequestException('Upload không thành công'), false)
    }
  },
}

export const uploadImageAndVideo: MulterOptions = {
  limits: {
    fileSize: Math.pow(1024, 2) * 30,
    fieldSize: Math.pow(1024, 2) * 30,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) => {
    const ext = mime.extension(file.mimetype)
    if (
      file &&
      _.includes(
        [
          // Ảnh
          'jpg',
          'jpeg',
          'png',
          'gif',
          'webp',
          'bmp',
          'tiff',
          'svg',
          'ico',
          'heic',
          'heif',
          // Video
          'mp4',
          'mov',
          'avi',
          'mkv',
          'flv',
          'wmv',
          'webm',
          'mpeg',
          '3gp',
          '3g2',
          'ogv',
        ],
        ext,
      )
    ) {
      cb(null, true)
    } else {
      cb(
        new BadRequestException(
          'Upload không thành công — chỉ chấp nhận ảnh hoặc video!',
        ),
        false,
      )
    }
  },
  storage: diskStorage({
    destination: './files/service',
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${uniqueSuffix}_${file.originalname}`)
    },
  }),
}

export const uploadProductImage: MulterOptions = {
  limits: {
    fileSize: Math.pow(1024, 2) * 20,
    fieldSize: Math.pow(1024, 2) * 20,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) => {
    if (_.includes(file.mimetype, 'image') && file) {
      cb(null, true)
    } else {
      cb(new BadRequestException('Upload không thành công'), false)
    }
  },
  storage: diskStorage({
    destination: './files/product',
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${uniqueSuffix}_${file.originalname}`)
    },
  }),
}
