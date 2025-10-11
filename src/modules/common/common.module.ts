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

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Bike, Service, Store])],
  controllers: [
    BrandController,
    BikeController,
    ServiceController,
    StoreController,
  ],
  providers: [BrandService, BikeService, ServiceService, StoreService],
  exports: [BrandService, BikeService, ServiceService, StoreService],
})
export class CommonModule {}
