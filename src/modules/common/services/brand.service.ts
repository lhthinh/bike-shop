import { Inject, Injectable, Search } from '@nestjs/common'
import { GetBrandDto } from '../dto/brand/get-brand.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from 'src/common/entities/_common/brand.entity'
import { ILike, Like, Repository } from 'typeorm'
import { CreateBrandDto } from '../dto/brand/create-brand.dto'
import { UpdateBrandDto } from '../dto/brand/update-brand.dto'
import { update } from 'lodash'
import { BikeService } from './bike.service'
import { Bike } from 'src/common/entities/_common/bike.entity'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @Inject(BikeService)
    private readonly bikeService: BikeService,
  ) {}

  async getBrand(getBrandDto: GetBrandDto) {
    const { search } = getBrandDto || {}
    return await this.brandRepository.find({
      select: { name: true, id: true },
      where: {
        name: ILike(`%${search || ''}%`),
      },
    })
  }

  async createBrand(createBrandDto: CreateBrandDto) {
    return await this.brandRepository.save(createBrandDto)
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto) {
    return await this.brandRepository.save({
      id,
      ...updateBrandDto,
    })
  }

  async deleteBrand(id: string) {
    const bikes = await this.bikeService.getBikeByBrandId(id)
    await this.bikeService.removeBikes(bikes)
    return await this.brandRepository.delete({
      id,
    })
  }
}
