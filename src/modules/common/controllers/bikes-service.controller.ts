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
import { BikeGenerationService } from '../services/bike-generation.service'
import { BikeServiceService } from '../services/bike-service.service'
import { CreateBikeServiceDto } from '../dto/bike-service/create-bike-service.dto'

@ApiTags('Common/BikeService')
@Controller('common/bike-service')
export class BikeServiceController {
  constructor(private readonly bikeServiceService: BikeServiceService) {}

  @Get('')
  async find(@Query() getBikeGenerationDto: GetBikeGenerationDto) {
    return await this.bikeServiceService.find()
  }

  @Post()
  async create(@Body() createBikeServiceDto: CreateBikeServiceDto) {
    return await this.bikeServiceService.create(createBikeServiceDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBikeGenerationDto: UpdateBikeGenerationDto,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
