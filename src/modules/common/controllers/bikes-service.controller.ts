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
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { CreateBikeServiceDto } from '../dto/bike-service/create-bike-service.dto'
import { GetBikeServiceDto } from '../dto/bike-service/get-bike-service.dto'
import { BikeServiceService } from '../services/bike-service.service'
import { UpdateBikeServiceDto } from '../dto/bike-service/update-bike-service.dto'

@ApiTags('Common/BikeService')
@Controller('common/bike-service')
export class BikeServiceController {
  constructor(private readonly bikeServiceService: BikeServiceService) {}

  @Get(':serviceId')
  async find(
    @Param('serviceId') serviceId: string,
    @Query() getBikeServiceDto: GetBikeServiceDto,
  ) {
    return await this.bikeServiceService.find(serviceId, getBikeServiceDto)
  }

  @Post()
  async create(@Body() createBikeServiceDto: CreateBikeServiceDto) {
    return await this.bikeServiceService.create(createBikeServiceDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBikeServiceDto: UpdateBikeServiceDto,
  ) {
    return await this.bikeServiceService.update(id, updateBikeServiceDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bikeServiceService.delete(id)
  }
}
