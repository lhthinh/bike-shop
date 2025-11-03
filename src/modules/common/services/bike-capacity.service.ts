import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ILike, Repository } from 'typeorm'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { BikeBikeGeneration } from 'src/common/entities/_common/bike-bike-generation.entity'
import _ from 'lodash'
import { BikeCapacity } from 'src/common/entities/_common/bike-capacity.entity'
import { Transactional } from 'typeorm-transactional'

@Injectable()
export class BikeCapacityService {
  constructor(
    @InjectRepository(BikeCapacity)
    private readonly bikeCapacityRepository: Repository<BikeCapacity>,
  ) {}

  async create(bikeId: string, capacityIds: string[]) {
    const list = _.map(capacityIds, (item) => ({
      bikeId,
      capacityId: item,
    }))
    return await this.bikeCapacityRepository.save(list)
  }

  @Transactional()
  async updateByBikeId(bikeId: string, capacityIds: string[]) {
    await this.bikeCapacityRepository.delete({
      bikeId,
    })
    const list = _.map(capacityIds, (item) => ({
      bikeId,
      capacityId: item,
    }))
    return await this.bikeCapacityRepository.save(list)
  }

  async deleteBikeCapacity(bikeId: string) {
    await this.bikeCapacityRepository.delete({ bikeId })
  }
}
