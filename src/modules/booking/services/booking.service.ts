import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { RemoveOptions, Repository, SaveOptions } from 'typeorm'
import { CreateBookingDto } from '../dto/create-booking.dto'
import { GetBookingFeeDto } from '../dto/get-booking-fee.dto '
import { GetDistanceDto } from '../dto/get-distance.dto '
import moment from 'moment'
import { getHourMinuteSecond } from 'src/common/utils/time.util'
import { StoreService } from 'src/modules/common/services/store.service'
import { HttpService } from '@nestjs/axios'
const dataTest = {
  type: 1,
  fullName: 'Lê Hoàng Thịnh',
  phoneNumber: '0931053876',
  license: '77-AE 05387',
  bookingDate: '2025-10-29T17:00:00.000Z',
  bookingTimeFrom: '9:30',
  bookingTimeTo: '10:30',
  note: 'Hãy gọi cho tôi trước khi đến',
  brandId: '',
  bikeId: '',
  serviceId: '782651b5-c1ac-4cd3-b8d8-3c14921e5320',
  storeId: '61df3fc4-bc48-4052-8f71-c846eb3c2e4c',
  bookingAddress: '398 Lê Trọng Tấn',
}
const map_key = 'Ib7L9Aqchp0rvybt7PKmEz0xkYTP2jLWMvQeYyyC'
@Injectable()
export class BookingService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @Inject(StoreService)
    private readonly storeService: StoreService,
  ) {}
  async getDistance(getDistanceDto: GetDistanceDto) {
    const { from, to } = getDistanceDto
    const url = `https://rsapi.goong.io/DistanceMatrix`
    const result = await this.httpService.axiosRef.get(url, {
      params: {
        api_key: map_key,
        origins: from,
        destinations: to,
        vehicle: 'bike',
      },
    })
    const data = result.data?.rows[0]?.elements[0]?.distance
    if (!data) {
      throw new BadRequestException('Không thể tính khoảng cách')
    }
    const distanceInMeter = data?.value
    return distanceInMeter
  }

  async createBooking(createBookingDto: CreateBookingDto) {
    const {
      type,
      fullName,
      phoneNumber,
      brandId,
      bikeId,
      license,
      serviceId,
      storeId,
      bookingDate,
      bookingTimeFrom,
      bookingTimeTo,
      note,
      bookingAddress,
    } = createBookingDto
    const { hour: hourFrom, minute: minuteFrom } =
      getHourMinuteSecond(bookingTimeFrom)
    const bookingFrom = new Date(
      moment(bookingDate)
        .set({
          hour: hourFrom,
          minute: minuteFrom,
        })
        .toISOString(),
    )
    const { hour: hourTo, minute: minuteTo } =
      getHourMinuteSecond(bookingTimeTo)
    const bookingTo = new Date(
      moment(bookingDate)
        .set({
          hour: hourTo,
          minute: minuteTo,
        })
        .toISOString(),
    )

    const data: Partial<Booking> = {
      type,
      fullName,
      phoneNumber,
      license,
      bookingFrom,
      bookingTo,
      bookingAddress,
      note,
      brandId: brandId || null,
      storeId: storeId || null,
      bikeId: bikeId || null,
      serviceId: serviceId || null,
    }
    return await this.bookingRepository.save(data)
  }

  async getBookingFee(getBookingFeeDto: GetBookingFeeDto) {
    const { bookingAddress, storeId, inOfficeTime } = getBookingFeeDto

    const store = await this.storeService.getOne(storeId)
    //?api_key=Ib7L9Aqchp0rvybt7PKmEz0xkYTP2jLWMvQeYyyC&address=398 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú, Thành phố Hồ Chí Minh
    const url = 'https://rsapi.goong.io/geocode'
    const getLatLngBookingAddress = await this.httpService.axiosRef.get(url, {
      params: {
        address: bookingAddress,
        api_key: map_key,
      },
    })
    const latLngBookingAddress =
      getLatLngBookingAddress.data?.results[0]?.geometry?.location
    if (!latLngBookingAddress) {
      throw new BadRequestException('Không tìm thấy địa chỉ của bạn')
    }

    const distanceInMeter = await this.getDistance({
      from: `${latLngBookingAddress?.lat},${latLngBookingAddress?.lng}`,
      to: `${store?.lat},${store?.lng}`,
    })
    const distanceInKilomiter = distanceInMeter / 1000
    const fee =
      distanceInKilomiter < 3
        ? 0
        : (distanceInKilomiter - 3) * (inOfficeTime ? 30000 : 45000)

    return {
      fee: Math.round(fee / 1000) * 1000,
      distanceInKilomiter: distanceInKilomiter,
    }
  }
}
