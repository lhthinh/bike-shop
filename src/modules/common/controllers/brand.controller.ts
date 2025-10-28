import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { GetBrandDto } from '../dto/brand/get-brand.dto'
import { BrandService } from '../services/brand.service'
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger'
import { CreateBrandDto } from '../dto/brand/create-brand.dto'
import { UpdateBrandDto } from '../dto/brand/update-brand.dto'

@ApiTags('Common/Brand')
@Controller('common/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('')
  async getBrand(@Query() getBrandDto: GetBrandDto) {
    return await this.brandService.getBrand(getBrandDto)
  }

  @Post()
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.createBrand(createBrandDto)
  }

  @Put(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.updateBrand(id, updateBrandDto)
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return await this.brandService.deleteBrand(id)
  }
}
