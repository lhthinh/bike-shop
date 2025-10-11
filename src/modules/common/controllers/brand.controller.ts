import { Controller, Get } from '@nestjs/common'
import { GetBrandDto } from '../dto/get-brand.dto'
import { BrandService } from '../services/brand.service'

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('init')
  async initBrand() {
    return await this.brandService.initBrand()
  }

  @Get('')
  async getBrand(getBrandDto: GetBrandDto) {
    return await this.brandService.getBrand(getBrandDto)
  }
}
