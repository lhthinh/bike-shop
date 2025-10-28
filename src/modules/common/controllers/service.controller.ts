import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ServiceService } from '../services/service.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'
import { CreateServiceDto } from '../dto/service/create-service.dto'
import { UpdateServiceDto } from '../dto/service/update-service.dto'

@ApiTags('Common/Service')
@Controller('common/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getBike(@Query() getBikeDto: GetBikeDto) {
    return await this.serviceService.find(getBikeDto)
  }

  @Get('hot-service')
  async getHotService() {
    return await this.serviceService.findHot()
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return await this.serviceService.findOne(id)
  }

  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return await this.serviceService.create(createServiceDto)
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return await this.serviceService.update(id, updateServiceDto)
  }
}
