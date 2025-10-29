import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ILike, Repository } from 'typeorm'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { BikeService } from './bike.service'

@Injectable()
export class BikeGenerationService {
  constructor(
    @InjectRepository(BikeGeneration)
    private readonly bikeGenerationRepository: Repository<BikeGeneration>,
    @Inject(BikeService)
    private readonly bikeService: BikeService,
  ) {}

  async find(getBikeGenerationDto: GetBikeGenerationDto) {
    const { search } = getBikeGenerationDto || {}
    return await this.bikeGenerationRepository.find({
      select: { name: true, id: true },
      where: {
        name: ILike(`%${search || ''}%`),
      },
    })
  }

  async findOneById(id: string) {
    return await this.bikeGenerationRepository.find({ where: { id } })
  }

  async create(createBikeGenerationDto: CreateBikeGenerationDto) {
    return await this.bikeGenerationRepository.save(createBikeGenerationDto)
  }

  async update(id: string, updateBikeGenerationDto: UpdateBikeGenerationDto) {
    return await this.bikeGenerationRepository.save({
      id,
      ...updateBikeGenerationDto,
    })
  }

  async delete(id: string) {
    const bikeGeneration = await this.bikeGenerationRepository.findOneBy({ id })
    if (!bikeGeneration) {
      throw new BadRequestException('Không tồn tại đời xe')
    }
    const bikes = await this.bikeService.findByBikeGenerationId(id)

    if (bikes.length > 0) {
      throw new BadRequestException(
        'Vui lòng xóa các xe đời ' + bikeGeneration.name,
      )
    }

    return await this.bikeGenerationRepository.delete({
      id,
    })
  }
}
