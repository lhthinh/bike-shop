import { BadRequestException, Inject, Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  DataSource,
  FindOptions,
  FindOptionsWhere,
  ILike,
  Like,
  Not,
  Repository,
} from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'
import { UpdateBikeDto } from '../dto/bike/update-bike.dto'
import { Transactional } from 'typeorm-transactional'
import { BikeBikeGenerationService } from './bike-bike-generation.service'
import { BikeCapacityService } from './bike-capacity.service'
import _ from 'lodash'
import { BikesService } from 'src/common/entities/_common/bike-service.entity'

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,

    @Inject(BikeBikeGenerationService)
    private readonly bikeBikeGenerationService: BikeBikeGenerationService,

    @Inject(BikeCapacityService)
    private readonly bikeCapacityService: BikeCapacityService,

    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  async find(getBikeDto: GetBikeDto) {
    const { search } = getBikeDto || {}
    const bikes = await this.dataSource
      .createQueryBuilder('b', 'bike')
      .select([
        'b.id',
        'b.name',
        // brand
        `(SELECT br.id, br.name
      FROM brand br
      WHERE br.id = b.brand_id
      FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS brand`,
        // bikeType
        `(SELECT bt.id, bt.name
      FROM bike_type bt
      WHERE bt.id = b.bike_type_id
      FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS bikeType`,
        // bikeGeneration
        `(SELECT bg.id, bg.name
      FROM bike_bike_generation bbg
      JOIN bike_generation bg ON bg.id = bbg.bike_generation_id
      WHERE bbg.bike_id = b.id
      FOR JSON PATH
    ) AS bikeGeneration`,
        // capacity
        `(SELECT c.id, c.name
      FROM bike_capacity bc
      JOIN capacity c ON c.id = bc.capacity_id
      WHERE bc.bike_id = b.id
      FOR JSON PATH
    ) AS capacity`,
      ])
      .from('bike', 'b')
      .where('b.deleted_at IS NULL')
      .andWhere('b.name LIKE :search', { search: `%${search || ''}%` })
      .orderBy('b.created_at', 'DESC')
      .getRawMany()
    return bikes
  }

  async findByBrandId(brandId: string) {
    return await this.bikeRepository.find({ where: { brandId } })
  }

  async findBikeNotInBikesService(serviceId: string) {
    return await this.bikeRepository.find({
      where: {
        bikeServices: {
          serviceId: Not(serviceId),
        },
      },
    })
  }

  async findBikeInBikesService(bikeServiceId: string, serviceId: string) {
    const bikeServiceQuery: FindOptionsWhere<BikesService> = {}
    if (bikeServiceId) {
      bikeServiceQuery.id = Not(bikeServiceId)
    }
    bikeServiceQuery.serviceId = serviceId
    return await this.bikeRepository.find({
      where: {
        bikeServices: {
          ...bikeServiceQuery,
        },
      },
    })
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
