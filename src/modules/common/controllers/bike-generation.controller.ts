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

@ApiTags('Common/BikeGeneration')
@Controller('common/bike-generation')
export class BikeTypeController {
  constructor(private readonly bikeGenerationService: BikeGenerationService) {}

  @Get('')
  async find(@Query() getBikeGenerationDto: GetBikeGenerationDto) {
    return await this.bikeGenerationService.find(
      getBikeGenerationDto,
    )
  }

  @Post()
  async create(@Body() createBikeGenerationDto: CreateBikeGenerationDto) {
    return await this.bikeGenerationService.create(
      createBikeGenerationDto,
    )
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBikeGenerationDto: UpdateBikeGenerationDto,
  ) {
    return await this.bikeGenerationService.update(
      id,
      updateBikeGenerationDto,
    )
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bikeGenerationService.delete(id)
  }
}
