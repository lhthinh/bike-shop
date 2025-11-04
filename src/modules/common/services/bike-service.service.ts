import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ILike, In, Not, Repository } from 'typeorm'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { BikeBikeGeneration } from 'src/common/entities/_common/bike-bike-generation.entity'
import _ from 'lodash'
import { CreateBikeServiceDto } from '../dto/bike-service/create-bike-service.dto'
import { BikesService } from 'src/common/entities/_common/bike-service.entity'
import { BikeService } from './bike.service'
import { UpdateBikeServiceDto } from '../dto/bike-service/update-bike-service.dto'
import { GetBikeServiceDto } from '../dto/bike-service/get-bike-service.dto'
import { BikeBikeService } from 'src/common/entities/_common/bike-bike-service.entity'
import { Transactional } from 'typeorm-transactional'

@Injectable()
export class BikeServiceService {
  constructor(
    @InjectRepository(BikesService)
    private readonly bikesServiceRepository: Repository<BikesService>,

    @InjectRepository(BikeBikeService)
    private readonly bikeBikeServiceRepository: Repository<BikeBikeService>,

    @Inject(BikeService)
    private readonly bikeService: BikeService,
  ) {}

  async find(serviceId: string, getBikeServiceDto: GetBikeServiceDto) {
    const { search, bikeId, brandId } = getBikeServiceDto || {}
    const query = this.bikesServiceRepository
      .createQueryBuilder('bs')
      .leftJoin('bs.service', 'service')
      .leftJoin('bs.bikeBikeService', 'bbs')
      .leftJoin('bbs.bike', 'bike')
      .select([
        'bs.id AS "id"', // 👈 lấy id để phục vụ update/delete
        'bs.serviceId AS "serviceId"',
        'service.name AS "serviceName"',
        'bs.fromPrice AS "fromPrice"',
        'bs.toPrice AS "toPrice"',
        'bs.fromTime AS "fromTime"',
        'bs.toTime AS "toTime"',
        'bs.unit AS "unit"',
      ])
      .addSelect(
        `
    JSON_AGG(
      DISTINCT JSONB_BUILD_OBJECT(
        'id', bike.id,
        'name', bike.name,
        'brandId', bike.brand_id
      )
    ) AS "bikes"
  `,
      )
    if (bikeId) {
      query.andWhere('bike.id = :bikeId', { bikeId })
    }
    if (brandId) {
      query.andWhere('bike.brandId = :brandId', { brandId })
    }

    query
      .groupBy(
        `
    bs.id,
    bs.serviceId,
    service.name,
    bs.fromPrice,
    bs.toPrice,
    bs.fromTime,
    bs.toTime,
    bs.unit
  `,
      )
      .orderBy('bs.updatedAt', 'DESC') // 👈 sắp theo updatedAt mới nhất

    if (search) {
      query.andWhere(
        '(service.name ILIKE :search OR bike.name ILIKE :search)',
        {
          search: `%${search}%`,
        },
      )
    }

    const result = await query.getRawMany()
    return result
  }

  async createBikeBikeService(data: Partial<BikeBikeService>[]) {
    await this.bikeBikeServiceRepository.save(data)
  }

  @Transactional()
  async create(createBikeServiceDto: CreateBikeServiceDto) {
    const { bikeIds, serviceId, fromTime, toTime, fromPrice, toPrice, unit } =
      createBikeServiceDto
    /*
    1 -> check tồn tại theo serviceId, fromTime, toTime, fromPrice, toPrice, unit
    2 -> lấy newBikeService, nếu có thì lấy cái cũ
    3 -> check trùng Bike đang có trong service hay không
    4 -> add Bike vào BikeBikeService
    */
    //1
    const bikeService = await this.bikesServiceRepository.findOne({
      where: {
        serviceId,
        fromPrice,
        toPrice,
        fromTime,
        toTime,
        unit,
      },
    })
    //2
    const newBikeServce = await this.bikesServiceRepository.save({
      id: bikeService?.id,
      serviceId,
      fromTime,
      toTime,
      fromPrice,
      toPrice,
      unit,
    })
    //3
    const findBikeInServices = await this.bikeService.findBikeInBikesService(
      serviceId,
      '',
    )

    const filterBikeDuplicate = _.filter(findBikeInServices, (item) =>
      _.includes(bikeIds, item.id),
    )

    if (filterBikeDuplicate.length > 0) {
      throw new BadRequestException(
        `Đã tồn tại ${_.map(filterBikeDuplicate, (item) => item.name).join(', ')} trong dịch vụ`,
      )
    }
    //4
    const data: Partial<BikeBikeService>[] = []
    for await (const bikeId of bikeIds) {
      data.push({ bikeId: bikeId, bikeServiceId: newBikeServce.id })
    }
    await this.createBikeBikeService(data)
    return newBikeServce
  }

  @Transactional()
  async update(id: string, updateBikeServiceDto: UpdateBikeServiceDto) {
    /**
     * 1. GetData các bike có trong service
     * 2. Kiểm trả bike nào bị xóa thì xóa đi
     * 3. xóa Bike khỏi BikeBikeService
     * 4. Kiểm tra các bike update thêm để check trùng với bikeService khác
     * 5. add Bike vào BikeBikeService
     * 6. update lại các data price... -> nếu đã có đăng ký trùng thì cảnh báo UI (hoặc suy nghĩ phương hướng là gọp 2 cái lại và xóa đi 1 cái)
     */
    const { bikeIds, fromPrice, fromTime, serviceId, toPrice, toTime, unit } =
      updateBikeServiceDto
    const currentBikeService = await this.bikesServiceRepository.findOne({
      where: { id },
      relations: {
        bikeBikeService: {
          bike: true,
        },
      },
    })

    if (!currentBikeService) {
      throw new BadRequestException(`Không tìm thấy dữ liệu`)
    }

    const oldBikeIds = currentBikeService.bikeBikeService.map((b) => b.bikeId)

    const removedBikeIds = _.difference(oldBikeIds, bikeIds)

    if (removedBikeIds.length > 0) {
      await this.bikeBikeServiceRepository.delete({
        bikeServiceId: id,
        bikeId: In(removedBikeIds),
      })
    }

    const newBikeIds = _.difference(bikeIds, oldBikeIds)

    if (newBikeIds.length > 0) {
      const findBikeInOtherServices =
        await this.bikeService.findBikeInBikesService(serviceId, id)

      const duplicateBikes = _.filter(findBikeInOtherServices, (item) =>
        _.includes(newBikeIds, item.id),
      )

      if (duplicateBikes.length > 0) {
        throw new BadRequestException(
          `Xe ${_.map(duplicateBikes, (i) => i.name).join(', ')} đã tồn tại trong dịch vụ khác.`,
        )
      }

      const dataToAdd: Partial<BikeBikeService>[] = newBikeIds.map(
        (bikeId) => ({
          bikeId,
          bikeServiceId: id,
        }),
      )
      await this.bikeBikeServiceRepository.save(dataToAdd)
    }

    const existedService = await this.bikesServiceRepository.findOne({
      where: {
        serviceId,
        fromPrice,
        toPrice,
        fromTime,
        toTime,
        unit,
        id: Not(id),
      },
      relations: ['bikeBikeService'],
    })

    if (existedService) {
      const bikesToMerge = existedService.bikeBikeService.map(
        (bbs) => bbs.bikeId,
      )

      const nonDuplicateBikes = _.difference(bikesToMerge, bikeIds)

      if (nonDuplicateBikes.length > 0) {
        const mergeData: Partial<BikeBikeService>[] = nonDuplicateBikes.map(
          (bikeId) => ({
            bikeId,
            bikeServiceId: id,
          }),
        )
        await this.bikeBikeServiceRepository.save(mergeData)
      }

      await this.bikeBikeServiceRepository.delete({
        bikeServiceId: existedService.id,
      })
      await this.bikesServiceRepository.delete(existedService.id)
    }

    await this.bikesServiceRepository.update(id, {
      fromPrice,
      toPrice,
      fromTime,
      toTime,
      unit,
    })

    return this.bikesServiceRepository.findOne({
      where: { id },
      relations: ['bikeBikeService', 'bikeBikeService.bike'],
    })
  }

  @Transactional()
  async delete(id: string) {
    await this.bikeBikeServiceRepository.delete({ bikeServiceId: id })
    await this.bikesServiceRepository.delete({ id })
  }
}
