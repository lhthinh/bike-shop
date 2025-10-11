import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from 'src/common/entities/_common/service.entity'
import { Like, Repository } from 'typeorm'
import { GetBrandDto } from '../dto/get-brand.dto'
import { Store } from 'src/common/entities/_common/store.entity'
import { GetStoreDto } from '../dto/get-store.dto'

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async initStore() {
    const store: Partial<Store>[] = [
      {
        code: '19ANVV',
        name: '19A Nguyễn Văn Vịnh',
        lat: 10.768721,
        lng: 106.630164,
      },
    ]

    return await this.storeRepository.save(store)
  }
  
  async getStore(getStoreDto: GetStoreDto) {
    const { search } = getStoreDto
    return await this.storeRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    })
  }

  async getOne(code: string) {
    return await this.storeRepository.findOne({
      where: { code },
    })
  }
}
