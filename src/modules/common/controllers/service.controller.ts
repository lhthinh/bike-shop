import { Controller, Get, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ServiceService } from '../services/service.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Common')
@Controller('common/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiExcludeEndpoint()
  @Get('init')
  async initService() {
    return await this.serviceService.initService()
  }

  @Get('')
  async getBike(@Query() getBikeDto: GetBikeDto) {
    return await this.serviceService.getService(getBikeDto)
  }
}
