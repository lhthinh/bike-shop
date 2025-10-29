import { BadRequestException, Inject, Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'
import { UpdateBikeDto } from '../dto/bike/update-bike.dto'
import { Transactional } from 'typeorm-transactional'
import { BikeBikeGenerationService } from './bike-bike-generation.service'
import { BikeCapacityService } from './bike-capacity.service'
import _ from 'lodash'

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,

    @Inject(BikeBikeGenerationService)
    private readonly bikeBikeGenerationService: BikeBikeGenerationService,

    @Inject(BikeCapacityService)
    private readonly bikeCapacityService: BikeCapacityService,
  ) {}

  async find(getBikeDto: GetBikeDto) {
    const { search } = getBikeDto || {}
    const bikes = await this.bikeRepository.find({
      relations: {
        brand: true,
        bikeType: true,
        bikeBikeGeneration: { bikeGeneration: true },
        bikeCapacity: { capacity: true },
      },
      where: {
        name: Like(`%${search || ''}%`),
      },
    })

    const result = _.map(bikes, (item) => ({
      name: item.name,
      brand: item.brand,
      brandId: item.brandId,
      bikeType: item.bikeType,
      bikeTypeId: item.bikeTypeId,
      bikeGeneration: _.map(
        item.bikeBikeGeneration,
        (itemBikeGeneration) => itemBikeGeneration.bikeGeneration,
      ),
      capacity: _.map(
        item.bikeCapacity,
        (itemBikeGeneration) => itemBikeGeneration.capacity,
      ),
    }))
    return result
  }

  async findByBrandId(brandId: string) {
    return await this.bikeRepository.find({ where: { brandId } })
  }

  async findByBikeTypeId(bikeTypeId: string) {
    return await this.bikeRepository.find({ where: { bikeTypeId } })
  }

  async findByBikeGenerationId(bikeGenerationId: string) {
    return await this.bikeRepository.find({
      where: { bikeBikeGeneration: { bikeGenerationId } },
    })
  }

  async findByCapacityId(capacityId: string) {
    return await this.bikeRepository.find({
      where: { bikeCapacity: { capacityId } },
    })
  }

  @Transactional()
  async create(createBikeDto: CreateBikeDto) {
    const { brandId, name, bikeGenerationIds, bikeTypeId, capacityIds } =
      createBikeDto
    console.log(createBikeDto)
    if (
      !(
        brandId &&
        name &&
        bikeGenerationIds.length > 0 &&
        bikeTypeId &&
        capacityIds.length > 0
      )
    ) {
      throw new BadRequestException('Vui lòng điền đầy đủ thông tin')
    }
    const bike = await this.bikeRepository.save({ brandId, name, bikeTypeId })
    await this.bikeBikeGenerationService.create(bike.id, bikeGenerationIds)
    await this.bikeCapacityService.create(bike.id, capacityIds)
  }

  async update(id: string, updateBikeDto: UpdateBikeDto) {
    const { brandId, name, bikeGenerationIds, bikeTypeId, capacityIds } =
      updateBikeDto
    if (!(brandId && name && bikeGenerationIds && bikeTypeId && capacityIds)) {
      throw new BadRequestException('Vui lòng điền đầy đủ thông tin')
    }
    return await this.bikeRepository.save({ id, ...updateBikeDto })
  }

  async delete(id: string) {
    return await this.bikeRepository.delete({ id })
  }

  async removes(bikes: Bike[]) {
    await this.bikeRepository.remove(bikes)
  }
}
