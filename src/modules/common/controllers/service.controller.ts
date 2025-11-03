import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ServiceService } from '../services/service.service'
import {
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiHideProperty,
  ApiTags,
} from '@nestjs/swagger'
import { CreateServiceDto } from '../dto/service/create-service.dto'
import { UpdateServiceDto } from '../dto/service/update-service.dto'
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express'
import {
  uploadImageAndVideo,
  uploadProductImage,
} from 'src/common/configs/multer.config'
import { GetServiceDto } from '../dto/service/get-service.dto'

@ApiTags('Common/Service')
@Controller('common/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() getServiceDto: GetServiceDto) {
    console.log(getServiceDto, 'getServiceDto')
    return await this.serviceService.find(getServiceDto)
  }

  @Get('hot-service')
  async getHotService() {
    return await this.serviceService.findHot()
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return await this.serviceService.findOne(id)
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'uploadImage', maxCount: 1 },
        { name: 'uploadVideo', maxCount: 1 },
      ],
      uploadImageAndVideo,
    ),
  )
  @Post()
  async createService(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFiles()
    files: {
      uploadImage?: Express.Multer.File[]
      uploadVideo?: Express.Multer.File[]
    },
  ) {
    const image = files.uploadImage?.[0]
    const video = files.uploadVideo?.[0]
    return await this.serviceService.create(createServiceDto, image, video)
  }

  @Put('reverse/:id')
  async reverse(@Param('id') id: string) {
    return await this.serviceService.reverse(id)
  }

  @ApiConsumes('multipart/form-data')
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'uploadImage', maxCount: 1 },
        { name: 'uploadVideo', maxCount: 1 },
      ],
      uploadImageAndVideo,
    ),
  )
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFiles()
    files: {
      uploadImage?: Express.Multer.File[]
      uploadVideo?: Express.Multer.File[]
    },
  ) {
    const image = files.uploadImage?.[0]
    const video = files.uploadVideo?.[0]
    return await this.serviceService.update(id, updateServiceDto, image, video)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.serviceService.delete(id)
  }
}
