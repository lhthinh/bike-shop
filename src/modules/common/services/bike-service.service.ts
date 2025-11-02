import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BikeGeneration } from 'src/common/entities/_common/bike-generation.entity'
import { ILike, Repository } from 'typeorm'
import { CreateBikeGenerationDto } from '../dto/bike-generation/create-bike-generation.dto'
import { GetBikeGenerationDto } from '../dto/bike-generation/get-bike-generation.dto'
import { UpdateBikeGenerationDto } from '../dto/bike-generation/update-bike-generation.dto'
import { BikeBikeGeneration } from 'src/common/entities/_common/bike-bike-generation.entity'
import _ from 'lodash'
import { CreateBikeServiceDto } from '../dto/bike-service/create-bike-service.dto'
import { BikesService } from 'src/common/entities/_common/bike-service.entity'
import { BikeService } from './bike.service'
import { UpdateBikeServiceDto } from '../dto/bike-service/update-bike-service.dto'

@Injectable()
export class BikeServiceService {
  constructor(
    @InjectRepository(BikesService)
    private readonly bikesServiceRepository: Repository<BikesService>,
    @Inject(BikeService)
    private readonly bikeService: BikeService,
  ) {}

  async find() {
    const list = await this.bikesServiceRepository
      .createQueryBuilder('b_s')
      .select([`*`])
      .getMany()
    return list
  }

  async create(createBikeServiceDto: CreateBikeServiceDto) {
    const { bikeIds, serviceId, fromTime, toTime, fromPrice, toPrice, unit } =
      createBikeServiceDto

    const findBikeInServices = await this.bikeService.findBikeInBikesService(
      '',
      serviceId,
    )

    const filterBikeDuplicate = _.filter(findBikeInServices, (item) =>
      _.includes(bikeIds, item.id),
    )

    if (filterBikeDuplicate.length > 0) {
      throw new BadRequestException(
        `Đã tồn tại ${_.map(filterBikeDuplicate, (item) => item.name).join(', ')} trong dịch vụ`,
      )
    }

    const data = _.map(bikeIds, (bikeId) => {
      return {
        bikeId,
        serviceId,
        fromPrice,
        toPrice,
        fromTime,
        toTime,
        unit,
      }
    })

    return await this.bikesServiceRepository.save(data)
  }

  async update(
    bikeServiceId: string,
    updateBikeServiceDto: UpdateBikeServiceDto,
  ) {
    const { bikeIds, fromPrice, fromTime, serviceId, toPrice, toTime, unit } =
      updateBikeServiceDto
  }
}
