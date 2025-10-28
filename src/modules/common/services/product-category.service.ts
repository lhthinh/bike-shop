import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductCategory } from 'src/common/entities/_common/product-category.entity'
import { ILike, Like, Repository } from 'typeorm'
import { GetProductCategoryDto } from '../dto/product-category/get-product-category.dto'
import { CreateProductCategoryDto } from '../dto/product-category/create-product-category.dto'
import { UpdateProductCategoryDto } from '../dto/product-category/update-product-category.dto'

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async createProductCategory(
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return await this.productCategoryRepository.save(createProductCategoryDto)
  }

  async getProductCategory(getProductCategoryDto: GetProductCategoryDto) {
    const { search } = getProductCategoryDto || {}
    return await this.productCategoryRepository.find({
      select: { id: true, name: true, description: true },
      where: {
        name: ILike(`%${search || ''}%`),
      },
    })
  }

  async getOneById(id: string) {
    const productCategory = await this.productCategoryRepository.findOneBy({
      id,
    })
    if (!productCategory) {
      throw new BadRequestException('Không tồn tại danh mục sản phẩm này')
    }
    return productCategory
  }

  async updateProductCategory(
    id: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    const productCategory = await this.getOneById(id)
    if (!productCategory) {
      throw new BadRequestException('Không tồn tại danh mục sản phẩm này')
    }

    return await this.productCategoryRepository.save({
      id,
      ...updateProductCategoryDto,
    })
  }

  async deleteProductCategory(id: string) {
    const productCategory = await this.getOneById(id)
    if (!productCategory) {
      throw new BadRequestException('Không tồn tại danh mục sản phẩm này')
    }

    return await this.productCategoryRepository.delete({
      id,
    })
  }
}
