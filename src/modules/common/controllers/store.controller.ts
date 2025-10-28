import { Controller, Get, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { StoreService } from '../services/store.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Common/Store')
@Controller('common/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('')
  async getBike(@Query() getBikeDto: GetBikeDto) {
    return await this.storeService.getStore(getBikeDto)
  }
}
