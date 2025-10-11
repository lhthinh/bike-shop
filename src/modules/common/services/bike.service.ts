import { Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async initBike() {
    const bike: Partial<Bike>[] = [
      {
        code: 'AB_2025_125',
        name: 'Air Blade 2025 125cc',
      },
    ]

    return await this.bikeRepository.save(bike)
  }

  async getBike(getBikeDto: GetBikeDto) {
    const { search } = getBikeDto
    return await this.bikeRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    })
  }
}
