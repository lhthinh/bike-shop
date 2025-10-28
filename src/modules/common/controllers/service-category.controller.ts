import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { ServiceCategoryService } from '../services/service-category.service'
import { GetServiceCategoryDto } from '../dto/service-category/get-service-category.dto'
import { CreateServiceCategoryDto } from '../dto/service-category/create-service-category.dto'
import { UpdateServiceCategoryDto } from '../dto/service-category/update-service-category.dto'

@ApiTags('Common/ServiceCategory')
@Controller('common/service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Get('')
  async find(@Query() getServiceCategoryDto: GetServiceCategoryDto) {
    return await this.serviceCategoryService.find(getServiceCategoryDto)
  }

  @Post()
  async create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return await this.serviceCategoryService.create(createServiceCategoryDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ) {
    return await this.serviceCategoryService.update(
      id,
      updateServiceCategoryDto,
    )
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.serviceCategoryService.delete(id)
  }
}
