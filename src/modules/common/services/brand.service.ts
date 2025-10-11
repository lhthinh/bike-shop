import { Injectable, Search } from '@nestjs/common'
import { GetBrandDto } from '../dto/get-brand.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from 'src/common/entities/_common/brand.entity'
import { Like, Repository } from 'typeorm'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async initBrand() {
    const brand: Partial<Brand>[] = [
      {
        code: 'AB',
        name: 'Air Blade',
      },
    ]

    return await this.brandRepository.save(brand)
  }

  async getBrand(getBrandDto: GetBrandDto) {
    const { search } = getBrandDto || {}
    return await this.brandRepository.find({select: {name: true , code : true},
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }
}
