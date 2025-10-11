import {
  Body,
  Controller,
  Post
} from '@nestjs/common'
import { GetServiceFeeDto } from './dto/get-service-fee.dto'
import { ServicesService } from './services.service'

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('get-service-fee')
  getServiceFee(@Body() createServiceDto: GetServiceFeeDto) {
    return this.servicesService.getServiceFee(createServiceDto)
  }
}
