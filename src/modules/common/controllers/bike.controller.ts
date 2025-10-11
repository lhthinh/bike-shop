import { Controller, Get } from '@nestjs/common'
import { GetBikeDto } from '../dto/get-bike.dto'
import { BikeService } from '../services/bike.service'

@Controller('bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get('init')
  async initBike() {
    return await this.bikeService.initBike()
  }

  @Get('')
  async getBike(getBikeDto: GetBikeDto) {
    return await this.bikeService.getBike(getBikeDto)
  }
}
