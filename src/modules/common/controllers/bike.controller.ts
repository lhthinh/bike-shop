import { Controller, Get, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Common/Bike')
@Controller('common/bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get('')
  async getBike(@Query() getBikeDto: GetBikeDto) {
    return await this.bikeService.getBike(getBikeDto)
  }
}
