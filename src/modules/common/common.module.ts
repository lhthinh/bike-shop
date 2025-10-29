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
import { CapacityController } from './controllers/capacity.controller'
import { CapacityService } from './services/capacity.service'
import { Capacity } from 'src/common/entities/_common/capacity.entity'
import { BikeType } from 'src/common/entities/_common/bike-type.entity'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ServiceCategory } from 'src/common/entities/_common/service-category.entity'
import { BikeTypeController } from './controllers/bike-type.controller'
import { BikeGenerationService } from './services/bike-generation.service'
import { ServiceCategoryController } from './controllers/service-category.controller'
import { BikeGenerationController } from './controllers/bike-generation.controller'
import { BikeTypeService } from './services/bike-type.service'
import { ServiceCategoryService } from './services/service-category.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      Bike,
      Service,
      Store,
      ProductCategory,
      Product,
      Capacity,
      BikeType,
      BikeGeneration,
      ServiceCategory,
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
    CapacityController,
    BikeTypeController,
    BikeGenerationController,
    ServiceCategoryController,
  ],
  providers: [
    BrandService,
    BikeService,
    ServiceService,
    StoreService,
    ProductCategoryService,
    ProductService,
    CapacityService,
    BikeTypeService,
    BikeGenerationService,
    ServiceCategoryService,
  ],
  exports: [BrandService, BikeService, ServiceService, StoreService],
})
export class CommonModule {}
