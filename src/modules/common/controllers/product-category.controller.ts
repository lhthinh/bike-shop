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
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { GetProductCategoryDto } from '../dto/get-product-category.dto'
import { ProductCategoryService } from '../services/product-category.service'
import { CreateProductCategoryDto } from '../dto/create-product-category.dto'
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto'

@ApiTags('Common/ProductCategory')
@Controller('common/product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('init')
  async initService() {
    return await this.productCategoryService.initProductCategory()
  }

  @Post()
  async createProductCategoryDto(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return await this.productCategoryService.createProductCategory(
      createProductCategoryDto,
    )
  }

  @Get()
  async getProductCategory(
    @Query() getProductCategoryDto: GetProductCategoryDto,
  ) {
    return await this.productCategoryService.getProductCategory(
      getProductCategoryDto,
    )
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return await this.productCategoryService.getOneById(id)
  }

  @Put('/:id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() updateProductCategory: UpdateProductCategoryDto,
  ) {
    return await this.productCategoryService.updateProductCategory(
      id,
      updateProductCategory,
    )
  }

  @Delete('/:id')
  async deleteProductCategory(@Param('id') id: string) {
    return await this.productCategoryService.deleteProductCategory(id)
  }
}
