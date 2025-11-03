import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/common/entities/_common/product.entity'
import { Like, Repository } from 'typeorm'
import { GetProductDto } from '../dto/product/get-product.dto'
import { CreateProductDto } from '../dto/product/create-product.dto'
import { ProductCategoryService } from './product-category.service'
import { UpdateProductDto } from '../dto/product/update-product.dto'
import { Transactional } from 'typeorm-transactional'
import { UploadService } from 'src/modules/upload/upload.service'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @Inject(ProductCategoryService)
    private readonly productCategoryService: ProductCategoryService,
    @Inject(UploadService)
    private readonly uploadService: UploadService,
  ) {}

  @Transactional()
  async createProduct(
    createProductDto: CreateProductDto,
    uploadFile: Express.Multer.File,
  ) {
    const { productCategoryId, description, name, price } = createProductDto
    const uploadFilePath = uploadFile.path
    let uploadFileId = null
    if (productCategoryId) {
      const productCate =
        await this.productCategoryService.getOneById(productCategoryId)

      if (!productCate) {
        throw new BadRequestException('Không tồn tại danh mục này')
      }
    }
    const newProduct = await this.productRepository.save({
      description,
      name,
      price,
      productCategoryId: productCategoryId || null,
    })
    if (uploadFilePath) {
      uploadFileId = (
        await this.uploadService.uploadProduct(uploadFilePath, newProduct.id)
      ).id
    }
    return await this.productRepository.save({
      uploadId: uploadFileId,
      ...newProduct,
    })
  }

  async getProduct(getProductDto: GetProductDto) {
    const { search } = getProductDto || {}
    return await this.productRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        productCategory: {
          name: true,
          description: true,
          id: true,
        },
        upload: {
          path: true,
          id: true,
        },
      },

      relations: {
        upload: true,
        productCategory: true,
      },
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }

  async getOneById(id: string) {
    const productCategory = await this.productRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        productCategory: {
          name: true,
          description: true,
          id: true,
        },
        upload: {
          path: true,
          id: true,
        },
      },

      relations: {
        upload: true,
        productCategory: true,
      },
      where: {
        id,
      },
    })
    if (!productCategory) {
      throw new BadRequestException('Không tồn tại danh mục sản phẩm này')
    }
    return productCategory
  }

  async updateProduct(
    id: string,
    updateProduct: UpdateProductDto,
    uploadFile: Express.Multer.File,
  ) {
    const productCategory = await this.getOneById(id)
    if (!productCategory) {
      throw new BadRequestException('Không tồn tại danh mục sản phẩm này')
    }
    const {
      description,
      name,
      price,
      productCategoryId,
      uploadFile: uplodaFileDto,
    } = updateProduct
    let uploadFileId = null
    await this.productRepository.save({
      id,
      uploadId: null,
    })
    if (uplodaFileDto) {
      uploadFileId = uplodaFileDto
    } else if (uploadFile) {
      await this.uploadService.removeUploadProduct(id)
      const uploadFilePath = uploadFile.path
      const { id: idUpload } = await this.uploadService.uploadProduct(
        uploadFilePath,
        id,
      )
      uploadFileId = idUpload
    }

    return await this.productRepository.save({
      id,
      description,
      name,
      price,
      uploadId: uploadFileId,
      productCategoryId: productCategoryId || null,
    })
  }

  async deleteProduct(id: string) {
    const product = await this.getOneById(id)
    if (!product) {
      throw new BadRequestException('Không tồn tại sản phẩm này')
    }

    return await this.productRepository.delete({
      id,
    })
  }
}
