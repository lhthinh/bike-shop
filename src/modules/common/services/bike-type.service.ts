import { BadRequestException, Inject, Injectable, Search } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { CreateBikeDto } from '../dto/bike/create-bike.dto'
import { BikeType } from 'src/common/entities/_common/bike-type.entity'
import { GetBikeTypeDto } from '../dto/bike-type/get-bike-type.dto'
import { CreateBikeTypeDto } from '../dto/bike-type/create-bike-type.dto'
import { UpdateBikeTypeDto } from '../dto/bike-type/update-bike-type.dto'
import { BikeService } from './bike.service'

@Injectable()
export class BikeTypeService {
  constructor(
    @InjectRepository(BikeType)
    private readonly bikeTypeRepository: Repository<BikeType>,
    @Inject(BikeService)
    private readonly bikeService: BikeService,
  ) {}

  async find(getBikeTypeDto: GetBikeTypeDto) {
    const { search } = getBikeTypeDto || {}
    return await this.bikeTypeRepository.find({
      select: { name: true, id: true },
      where: {
        name: ILike(`%${search || ''}%`),
      },
    })
  }

  async findOneById(id: string) {
    return await this.bikeTypeRepository.find({ where: { id } })
  }

  async create(createBikeTypeDto: CreateBikeTypeDto) {
    return await this.bikeTypeRepository.save(createBikeTypeDto)
  }

  async update(id: string, updateBikeTypeDto: UpdateBikeTypeDto) {
    return await this.bikeTypeRepository.save({ id, ...updateBikeTypeDto })
  }

  async delete(id: string) {
    const bikeType = await this.bikeTypeRepository.findOneBy({ id })
    if (!bikeType) {
      throw new BadRequestException('Không tồn tại loại xe')
    }
    const bikes = await this.bikeService.findByBikeTypeId(id)

    if (bikes.length > 0) {
      throw new BadRequestException(
        'Vui lòng xóa các xe có hiệu ' + bikeType.name,
      )
    }

    return await this.bikeTypeRepository.delete({
      id,
    })
  }
}
