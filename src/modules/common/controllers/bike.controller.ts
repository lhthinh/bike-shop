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
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'
import { UpdateBikeDto } from '../dto/bike/update-bike.dto'
import { Public } from 'src/common/decorators/public.decorator'

@ApiTags('Common/Bike')
@Controller('common/bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Public()
  @Get()
  async find(@Query() getBikeDto: GetBikeDto) {
    return await this.bikeService.find(getBikeDto)
  }

  @Post()
  async create(@Body() createBikeDto: CreateBikeDto) {
    return await this.bikeService.create(createBikeDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto) {
    return await this.bikeService.update(id, updateBikeDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bikeService.delete(id)
  }
}
