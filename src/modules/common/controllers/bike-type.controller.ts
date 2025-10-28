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
import { CreateBikeTypeDto } from '../dto/bike-type/create-bike-type.dto'
import { UpdateBikeTypeDto } from '../dto/bike-type/update-bike-type.dto'
import { GetBrandDto } from '../dto/brand/get-brand.dto'
import { BikeTypeService } from '../services/bike-type.service'

@ApiTags('Common/BikeType')
@Controller('common/bike-type')
export class BikeTypeController {
  constructor(private readonly bikeTypeService: BikeTypeService) {}

  @Get('')
  async find(@Query() getBrandDto: GetBrandDto) {
    return await this.bikeTypeService.find(getBrandDto)
  }

  @Post()
  async create(@Body() createBikeTypeDto: CreateBikeTypeDto) {
    return await this.bikeTypeService.create(createBikeTypeDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBikeTypeDto: UpdateBikeTypeDto,
  ) {
    return await this.bikeTypeService.update(id, updateBikeTypeDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bikeTypeService.delete(id)
  }
}
