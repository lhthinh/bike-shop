import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ApiConsumes, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { ProductService } from '../services/product.service'
import { CreateProductDto } from '../dto/create-product.dto'
import { GetProductDto } from '../dto/get-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { uploadProductImage } from 'src/common/configs/multer.config'
import { UpdateProductDto } from '../dto/update-product.dto'

@ApiTags('Common/Product')
@Controller('common/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('uploadFile', uploadProductImage))
  @Post()
  async createProductDto(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() uploadFile: Express.Multer.File,
  ) {
    return await this.productService.createProduct(createProductDto, uploadFile)
  }

  @Get()
  async getProduct(@Query() getProductDto: GetProductDto) {
    return await this.productService.getProduct(getProductDto)
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return await this.productService.getOneById(id)
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('uploadFile', uploadProductImage))
  @Put('/:id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() uploadFile: Express.Multer.File,
  ) {
    return await this.productService.updateProduct(
      id,
      updateProductDto,
      uploadFile,
    )
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id)
  }
}
