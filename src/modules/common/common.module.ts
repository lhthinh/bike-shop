import { Module } from '@nestjs/common'
import { BrandService } from './services/brand.service'
import { BrandController } from './controllers/brand.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Brand } from 'src/common/entities/_common/brand.entity'
import { BikeController } from './controllers/bike.controller'
import { BikeService } from './services/bike.service'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { ServiceController } from './controllers/service.controller'
import { ServiceService } from './services/service.service'
import { Service } from 'src/common/entities/_common/service.entity'
import { Store } from 'src/common/entities/_common/store.entity'
import { StoreController } from './controllers/store.controller'
import { StoreService } from './services/store.service'
import { ProductCategoryController } from './controllers/product-category.controller'
import { ProductCategoryService } from './services/product-category.service'
import { ProductCategory } from 'src/common/entities/_common/product-category.entity'
import { Product } from 'src/common/entities/_common/product.entity'
import { ProductController } from './controllers/product.controller'
import { ProductService } from './services/product.service'
import { UploadModule } from '../upload/upload.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      Bike,
      Service,
      Store,
      ProductCategory,
      Product,
    ]),
    UploadModule,
  ],
  controllers: [
    BrandController,
    BikeController,
    ServiceController,
    StoreController,
    ProductCategoryController,
    ProductController,
  ],
  providers: [
    BrandService,
    BikeService,
    ServiceService,
    StoreService,
    ProductCategoryService,
    ProductService,
  ],
  exports: [BrandService, BikeService, ServiceService, StoreService],
})
export class CommonModule {}
