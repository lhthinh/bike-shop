import { Controller, Get } from '@nestjs/common'
import { UploadService } from './upload.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('product')
  async getImageProduct() {
    return await this.uploadService.getImageProduct()
  }
}
