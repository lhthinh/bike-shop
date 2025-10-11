import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from 'src/common/entities/_common/service.entity'
import { Like, Repository } from 'typeorm'
import { GetBrandDto } from '../dto/get-brand.dto'
import { GetServiceDto } from '../dto/get-service.dto'

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
      },
    ]

    return await this.serviceRepository.save(service)
  }

  async getService(getServiceDto: GetServiceDto) {
    const { search } = getServiceDto
    return await this.serviceRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    })
  }
}
