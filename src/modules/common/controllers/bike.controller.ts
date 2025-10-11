import { Controller, Get, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Common')
@Controller('common/bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @ApiExcludeEndpoint()
  @Get('init')
  async initBike() {
    return await this.bikeService.initBike()
  }

  @Get('')
  async getBike(@Query() getBikeDto: GetBikeDto) {
    return await this.bikeService.getBike(getBikeDto)
  }
}
