import { Controller, Get, Query } from '@nestjs/common'
import { GetBrandDto } from '../dto/get-brand.dto'
import { BrandService } from '../services/brand.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Common')
@Controller('common/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiExcludeEndpoint()
  @Get('init')
  async initBrand() {
    return await this.brandService.initBrand()
  }

  @Get('')
  async getBrand(@Query() getBrandDto: GetBrandDto) {
    return await this.brandService.getBrand(getBrandDto)
  }
}
