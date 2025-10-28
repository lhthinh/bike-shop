import { BadRequestException, Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'
import { UpdateBikeDto } from '../dto/bike/update-bike.dto'

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async find(getBikeDto: GetBikeDto) {
    const { search } = getBikeDto || {}
    return await this.bikeRepository.find({
      select: { name: true, id: true },
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }

  async findByBrandId(brandId: string) {
    return await this.bikeRepository.find({ where: { brandId } })
  }

  async findByBikeTypeId(bikeTypeId: string) {
    return await this.bikeRepository.find({ where: { bikeTypeId } })
  }

  async findByBikeGenerationId(bikeGenerationId: string) {
    return await this.bikeRepository.find({ where: { bikeGenerationId } })
  }

  async findByCapacityId(capacityId: string) {
    return await this.bikeRepository.find({ where: { capacityId } })
  }

  async create(createBikeDto: CreateBikeDto) {
    const { brandId, name, bikeGenerationId, bikeTypeId, capacityId } =
      createBikeDto
    if (!(brandId && name && bikeGenerationId && bikeTypeId && capacityId)) {
      throw new BadRequestException('Vui lòng điền đầy đủ thông tin')
    }
    return await this.bikeRepository.save(createBikeDto)
  }

  async update(id: string, updateBikeDto: UpdateBikeDto) {
    const { brandId, name, bikeGenerationId, bikeTypeId, capacityId } =
      updateBikeDto
    if (!(brandId && name && bikeGenerationId && bikeTypeId && capacityId)) {
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
