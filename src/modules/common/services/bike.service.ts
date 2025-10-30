import { BadRequestException, Inject, Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, ILike, Like, Repository } from 'typeorm'
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

    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  async find(getBikeDto: GetBikeDto) {
    const { search } = getBikeDto || {}
    const bikes = await this.dataSource.query(`
  SELECT
    b.id,
    b.name,

    -- brand
    json_build_object(
      'id', br.id,
      'name', br.name
    ) AS brand,

    -- bike type
    json_build_object(
      'id', bt.id,
      'name', bt.name
    ) AS "bikeType",

    -- bike generations
    (
      SELECT json_agg(json_build_object(
        'id', bg.id,
        'name', bg.name
      ))
      FROM bike_bike_generation bbg
      JOIN bike_generation bg ON bg.id = bbg.bike_generation_id
      WHERE bbg.bike_id = b.id
    ) AS "bikeGenerations",

    -- capacities
    (
      SELECT json_agg(json_build_object(
        'id', c.id,
        'name', c.name
      ))
      FROM bike_capacity bc
      JOIN capacity c ON c.id = bc.capacity_id
      WHERE bc.bike_id = b.id
    ) AS "capacities"

  FROM bike b
  LEFT JOIN brand br ON br.id = b.brand_id
  LEFT JOIN bike_type bt ON bt.id = b.bike_type_id
  WHERE b.deleted_at IS NULL
  ORDER BY b.created_at DESC
`)
    return bikes
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
