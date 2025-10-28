import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from 'src/common/entities/_common/service.entity'
import { Like, Repository } from 'typeorm'
import { GetBrandDto } from '../dto/get-brand.dto'
import { GetServiceDto } from '../dto/get-service.dto'
import { Booking } from 'src/common/entities/_booking/booking.entity'

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async initService() {
    const service: Partial<Service>[] = [
      {
        code: 'BDXM',
        name: 'Bảo dưỡng xe máy',
        description: '',
      },
    ]

    return await this.serviceRepository.save(service)
  }

  async getService(getServiceDto: GetServiceDto) {
    const { search } = getServiceDto || {}
    return await this.serviceRepository.find({
      select: { name: true, code: true },
      where: {
        name: Like(`%${search || ''}%`),
      },
    })
  }

  async getHotService() {
    const posts = await this.serviceRepository
      .createQueryBuilder('s')
      .select('s.id, s.name, s.description, bookingCount')
      .leftJoin(Booking, 'b', 'b.serviceCode = s.code')
      .addSelect('COUNT(b.id)', 'bookingCount')
      .groupBy('s.id')
      .limit(18)
      .getRawMany()

    return posts
  }
}
