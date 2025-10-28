import { Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async getBike(getBikeDto: GetBikeDto) {
    const { search } = getBikeDto || {}
    return await this.bikeRepository.find({
      select: { name: true, id: true },
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }

  async getBikeByBrandId(brandId: string) {
    return await this.bikeRepository.find({ where: { brandId } })
  }

  async createBike(createBikeDto: CreateBikeDto) {
    const { brandId, name } = createBikeDto
    
  }

  async removeBikes(bikes: Bike[]) {
    await this.bikeRepository.remove(bikes)
  }
}
