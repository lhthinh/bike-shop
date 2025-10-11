import { Controller, Get, Query } from '@nestjs/common'
import { GetBikeDto } from '../dto/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { StoreService } from '../services/store.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Common')
@Controller('common/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiExcludeEndpoint()
  @Get('init')
  async initStore() {
    return await this.storeService.initStore()
  }
  @Get('')
  async getBike(@Query() getBikeDto: GetBikeDto) {
    return await this.storeService.getStore(getBikeDto)
  }
}
