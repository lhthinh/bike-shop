import { Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'
import { BikeType } from 'src/common/entities/_common/bike-type.entity'
import { GetBikeTypeDto } from '../dto/bike-type/get-bike-type.dto'
import { CreateBikeTypeDto } from '../dto/bike-type/create-bike-type.dto'
import { UpdateBikeTypeDto } from '../dto/bike-type/update-bike-type.dto'

@Injectable()
export class BikeTypeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeTypeRepository: Repository<BikeType>,
  ) {}

  async getBikeType(getBikeTypeDto: GetBikeTypeDto) {
    const { search } = getBikeTypeDto || {}
    return await this.bikeTypeRepository.find({
      select: { name: true, id: true },
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }

  async getBikeTypeById(id: string) {
    return await this.bikeTypeRepository.find({ where: { id } })
  }

  async createBikeType(createBikeTypeDto: CreateBikeTypeDto) {
    return await this.bikeTypeRepository.save(createBikeTypeDto)
  }

  async updateBikeType(id: string, updateBikeTypeDto: UpdateBikeTypeDto) {
    return await this.bikeTypeRepository.save({ id, ...updateBikeTypeDto })
  }
}
