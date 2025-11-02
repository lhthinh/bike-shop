import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from 'src/common/entities/_common/service.entity'
import { ILike, Like, Repository } from 'typeorm'
import { GetBrandDto } from '../dto/brand/get-brand.dto'
import { GetServiceDto } from '../dto/service/get-service.dto'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { CreateServiceDto } from '../dto/service/create-service.dto'
import { UploadService } from 'src/modules/upload/upload.service'
import { Transactional } from 'typeorm-transactional'

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @Inject(UploadService)
    private readonly uploadService: UploadService,
  ) {}

  async find(getServiceDto: GetServiceDto) {
    const { search } = getServiceDto || {}
    return await this.serviceRepository.find({
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

  @Transactional()
  async create(
    createServiceDto: CreateServiceDto,
    uploadImage: Express.Multer.File,
    uploadVideo: Express.Multer.File,
  ) {
    const { description, name, price, serviceCategoryId } = createServiceDto
    if (!serviceCategoryId) {
      throw new BadRequestException('Vui lòng chọn danh mục dịch vụ')
    }

    const newService = await this.serviceRepository.save({
      description,
      serviceCategoryId,
      name,
      price,
    })
    let uploadImageId = null
    let uploadVideoId = null

    const uploadImagePath = uploadImage.path
    const uploadVideoPath = uploadVideo.path
    console.log(uploadImage, uploadVideo)
    if (uploadImagePath) {
      uploadImageId = (
        await this.uploadService.uploadServiceImage(
          uploadImagePath,
          newService.id,
        )
      ).id
    }

    if (uploadVideoPath) {
      uploadVideoId = (
        await this.uploadService.uploadServiceVideo(
          uploadVideoPath,
          newService.id,
        )
      ).id
    }
    return await this.serviceRepository.save({
      ...newService,
      uploadImageId,
      uploadVideoId,
    })
  }

  async update(id: string, createServiceDto: CreateServiceDto) {
    const {
      description,
      name,
      price,
      serviceCategoryId,
      uploadImage,
      uploadVideo,
    } = createServiceDto
    return await this.serviceRepository.save({
      id,
      description,
      serviceCategoryId,
      name,
      price,
    })
  }

  async findHot() {
    const posts = await this.serviceRepository
      .createQueryBuilder('s')
      .select('s.id, s.name, s.description, s.price, s.')
      .leftJoin(Booking, 'b', 'b.serviceId = s.id')
      .addSelect('COUNT(b.id)', 'bookingCount')
      .groupBy('s.id')
      .limit(18)
      .getRawMany()

    return posts
  }
}
