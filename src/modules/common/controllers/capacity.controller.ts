import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'
import { get } from 'lodash'
import { GetCapacityDto } from '../dto/capacity/get-capacity.dto'
import { CapacityService } from '../services/capacity.service'
import { CreateCapacityDto } from '../dto/capacity/create-capacity.dto'
import { UpdateCapacityDto } from '../dto/capacity/update-capacity.dto'

@ApiTags('Common/Capacity')
@Controller('common/capacity')
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Get()
  async getCapacity(@Query() getCapacityDto: GetCapacityDto) {
    return await this.capacityService.getCapacity(getCapacityDto)
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return await this.capacityService.getOneById(id)
  }

  @Post()
  async createCapacity(@Body() createCapacityDto: CreateCapacityDto) {
    return await this.capacityService.createCapacity(createCapacityDto)
  }

  @Put(':id')
  async updateCapacity(
    @Param('id') id: string,
    @Body() updateCapacityDto: UpdateCapacityDto,
  ) {
    return await this.capacityService.updateCapacity(id, updateCapacityDto)
  }
}
