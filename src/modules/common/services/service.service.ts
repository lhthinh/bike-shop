import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Service } from 'src/common/entities/_common/service.entity'
import { ILike, IsNull, Like, Not, Repository } from 'typeorm'
import { GetBrandDto } from '../dto/brand/get-brand.dto'
import { GetServiceDto } from '../dto/service/get-service.dto'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { CreateServiceDto } from '../dto/service/create-service.dto'
import { UploadService } from 'src/modules/upload/upload.service'
import { Transactional } from 'typeorm-transactional'
import { Upload } from 'src/common/entities/_upload/upload.entity'
import { UpdateServiceDto } from '../dto/service/update-service.dto'
import { ServiceCategory } from 'src/common/entities/_common/service-category.entity'

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
      relations: {
        uploadImage: true,
        uploadVideo: true,
        serviceCategory: true,
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

  @Transactional()
  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    uploadImage: Express.Multer.File,
    uploadVideo: Express.Multer.File,
  ) {
    const {
      description,
      name,
      price,
      serviceCategoryId,
      uploadImage: uploadImageDto,
      uploadVideo: uploadVideoDto,
    } = updateServiceDto

    const service = await this.serviceRepository.findOne({
      where: {
        id,
      },
      relations: {
        uploadImage: true,
        uploadVideo: true,
      },
    })
    let uploadImageId = null
    let uploadVideoId = null

    const uploadImagePath = uploadImage.path
    const uploadVideoPath = uploadVideo.path

    if (uploadImage) {
      uploadImageId = (
        await this.uploadService.uploadServiceImage(uploadImagePath, id)
      ).id
      await this.uploadService.remove(service.uploadImage.path)
    }
    if (uploadVideo) {
      uploadVideoId = (
        await this.uploadService.uploadServiceImage(uploadVideoPath, id)
      ).id
      await this.uploadService.remove(service.uploadVideo.path)
    }
    return await this.serviceRepository.save({
      id,
      description,
      serviceCategoryId,
      name,
      price,
      uploadImageId,
      uploadVideoId,
    })
  }

  async findHot() {
    const posts = await this.serviceRepository
      .createQueryBuilder('s')
      .select([
        's.id as "id"',
        's.name as "name"',
        's.description as "description"',
        's.price as "price"',
        `
         json_build_object(
          'id', ui.id,
          'path', ui.path
        ) AS "uploadImage"
         `,
        `
         json_build_object(
          'id', uv.id,
          'path', uv.path
        ) AS "uploadVideo"
         `,
        `
          json_build_object(
          'id', s_c.id,
          'name', s_c.name
        ) AS "serviceCategory"
         `,
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)::int')
          .from('booking', 'b')
          .where('b.service_id = s.id')
      }, 'bookingCount')
      .leftJoin(Upload, 'ui', 'ui.id = s.uploadImageId')
      .leftJoin(ServiceCategory, 's_c', 's_c.id = s.serviceCategoryId')
      .leftJoin(Upload, 'uv', 'uv.id = s.uploadVideoId')
      .orderBy('"bookingCount"', 'DESC')
      .limit(18)
      .getRawMany()

    return posts
  }

  async delete(id: string) {
    await this.serviceRepository.softDelete({ id })
  }

  async getListDelete(getServiceDto: GetServiceDto) {
    const { search } = getServiceDto || {}
    return await this.serviceRepository.find({
      where: {
        name: ILike(`%${search || ''}%`),
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    })
  }

  async reverse(id: string) {
    return await this.serviceRepository.save({
      id,
      deletedAt: null,
    })
  }
}
