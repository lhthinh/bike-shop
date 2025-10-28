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

@ApiTags('Common/ServiceCategory')
@Controller('common/service-category')
export class BikeTypeController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Get('')
  async find(@Query() getBikeGenerationDto: GetBikeGenerationDto) {
    return await this.serviceCategoryService.find(getBikeGenerationDto)
  }

  @Post()
  async create(@Body() createBikeGenerationDto: CreateBikeGenerationDto) {
    return await this.serviceCategoryService.create(createBikeGenerationDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBikeGenerationDto: UpdateBikeGenerationDto,
  ) {
    return await this.serviceCategoryService.update(id, updateBikeGenerationDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.serviceCategoryService.delete(id)
  }
}
