import { Controller, Get } from '@nestjs/common'
import { GetBikeDto } from '../dto/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ServiceService } from '../services/service.service'

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('init')
  async initService() {
    return await this.serviceService.initService()
  }

  @Get('')
  async getBike(getBikeDto: GetBikeDto) {
    return await this.serviceService.getService(getBikeDto)
  }
}
