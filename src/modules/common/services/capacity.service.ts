import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Bike } from 'src/common/entities/_common/bike.entity'
import { Capacity } from 'src/common/entities/_common/capacity.entity'
import { Like, Repository } from 'typeorm'
import { GetBikeDto } from '../dto/bike/get-bike.dto'
import { GetCapacityDto } from '../dto/capacity/get-capacity.dto'
import { CreateCapacityDto } from '../dto/capacity/create-capacity.dto'
import { UpdateCapacityDto } from '../dto/capacity/update-capacity.dto'

@Injectable()
export class CapacityService {
  constructor(
    @InjectRepository(Capacity)
    private readonly capacityRepository: Repository<Capacity>,
  ) {}

  async getCapacity(getCapacityDto: GetCapacityDto) {
    const { search } = getCapacityDto
    return await this.capacityRepository.find({
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }

  async getOneById(id: string) {
    const productCategory = await this.capacityRepository.findOneBy({
      id,
    })
    if (!productCategory) {
      throw new NotFoundException('Không tồn tại dung tích')
    }
    return productCategory
  }

  async createCapacity(createCapacityDto: CreateCapacityDto) {
    return await this.capacityRepository.save(createCapacityDto)
  }

  async updateCapacity(id: string, updateCapacityDto: UpdateCapacityDto) {
    return await this.capacityRepository.save({ id, ...updateCapacityDto })
  }
}
