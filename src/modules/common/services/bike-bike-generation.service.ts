import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ILike, Repository } from 'typeorm'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { BikeBikeGeneration } from 'src/common/entities/_common/bike-bike-generation.entity'
import _ from 'lodash'

@Injectable()
export class BikeBikeGenerationService {
  constructor(
    @InjectRepository(BikeBikeGeneration)
    private readonly bikeBikeGenerationRepository: Repository<BikeBikeGeneration>,
  ) {}

  async create(bikeId: string, generationIds: string[]) {
    const list = _.map(generationIds, (item) => ({
      bikeId,
      bikeGenerationId: item,
    }))
    return await this.bikeBikeGenerationRepository.save(list)
  }

  async updateByBikeId(bikeId: string, generationIds: string[]) {
    await this.bikeBikeGenerationRepository.delete({
      bikeId,
    })
    const list = _.map(generationIds, (item) => ({
      bikeId,
      bikeGenerationId: item,
    }))
    return await this.bikeBikeGenerationRepository.save(list)
  }

  async deleteBikeBikeGeneration(bikeId: string) {
    await this.bikeBikeGenerationRepository.delete({ bikeId })
  }
}
