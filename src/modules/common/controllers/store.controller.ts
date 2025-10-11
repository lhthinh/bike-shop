import { Controller, Get } from '@nestjs/common'
import { GetBikeDto } from '../dto/get-bike.dto'
import { BikeService } from '../services/bike.service'
import { StoreService } from '../services/store.service'

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('init')
  async initStore() {
    return await this.storeService.initStore()
  }
  @Get('')
  async getBike(getBikeDto: GetBikeDto) {
    return await this.getBike(getBikeDto)
  }
}
