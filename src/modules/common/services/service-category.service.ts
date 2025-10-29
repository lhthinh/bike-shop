import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ILike, Repository } from 'typeorm'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { BikeService } from './bike.service'
import { ServiceCategory } from 'src/common/entities/_common/service-category.entity'
import { ServiceService } from './service.service'
import { GetServiceCategoryDto } from '../dto/service-category/get-service-category.dto'
import { CreateServiceCategoryDto } from '../dto/service-category/create-service-category.dto'
import { UpdateServiceCategoryDto } from '../dto/service-category/update-service-category.dto'

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
    @Inject(ServiceService)
    private readonly serviceService: ServiceService,
  ) {}

  async find(getServiceCategoryDto: GetServiceCategoryDto) {
    const { search } = getServiceCategoryDto || {}
    return await this.serviceCategoryRepository.find({
      select: { name: true, id: true },
      where: {
        name: ILike(`%${search || ''}%`),
      },
    })
  }

  async findOneById(id: string) {
    return await this.serviceCategoryRepository.find({ where: { id } })
  }

  async create(createServiceCategoryDto: CreateServiceCategoryDto) {
    return await this.serviceCategoryRepository.save(createServiceCategoryDto)
  }

  async update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    return await this.serviceCategoryRepository.save({
      id,
      ...updateServiceCategoryDto,
    })
  }

  async delete(id: string) {
    const serviceCategory = await this.serviceCategoryRepository.findOneBy({
      id,
    })
    if (!serviceCategory) {
      throw new BadRequestException('Không tồn tại danh mục sản phẩm')
    }
    const services = await this.serviceService.findByServiceCategoryId(id)

    if (services.length > 0) {
      throw new BadRequestException(
        'Vui lòng xóa các dịch vụ thuộc danh mục ' + serviceCategory.name,
      )
    }

    return await this.serviceCategoryRepository.delete({
      id,
    })
  }
}
