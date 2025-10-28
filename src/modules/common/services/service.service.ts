import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from 'src/common/entities/_common/service.entity'
import { ILike, Like, Repository } from 'typeorm'
import { GetBrandDto } from '../dto/brand/get-brand.dto'
import { GetServiceDto } from '../dto/service/get-service.dto'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { CreateServiceDto } from '../dto/service/create-service.dto'

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async find(getServiceDto: GetServiceDto) {
    const { search } = getServiceDto || {}
    return await this.serviceRepository.find({
      select: { name: true, id: true },
      where: {
        name: ILike(`%${search || ''}%`),
      },
    })
  }

  async findOne(id: string) {
    return await this.serviceRepository.findOneBy({ id })
  }

  async findByServiceCategoryId(serviceCategoryId: string) {
    return await this.serviceRepository.findBy({ serviceCategoryId })
  }

  async create(createServiceDto: CreateServiceDto) {
    const { description, name, price, serviceCategoryId } = createServiceDto
    if (!serviceCategoryId) {
      throw new BadRequestException('Vui lòng chọn danh mục dịch vụ')
    }
    return await this.serviceRepository.save({
      description,
      serviceCategoryId,
      name,
      price,
    })
  }

  async update(id: string, createServiceDto: CreateServiceDto) {
    const { description, name, price } = createServiceDto
    return await this.serviceRepository.save({
      id,
      description,
      name,
      price,
    })
  }

  async findHot() {
    const posts = await this.serviceRepository
      .createQueryBuilder('s')
      .select('s.id, s.name, s.description, s.price')
      .leftJoin(Booking, 'b', 'b.serviceId = s.id')
      .addSelect('COUNT(b.id)', 'bookingCount')
      .groupBy('s.id')
      .limit(18)
      .getRawMany()

    return posts
  }
}
