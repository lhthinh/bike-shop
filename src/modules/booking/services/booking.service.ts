import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { RemoveOptions, Repository, SaveOptions } from 'typeorm'
import { CreateBookingDto } from '../dto/create-booking.dto'
import { GetBookingFeeDto } from '../dto/get-booking-fee.dto '
import { GetDistanceDto } from '../dto/get-distance.dto '
import moment from 'moment'
import { getHourMinuteSecond } from 'src/common/utils/time.util'
import axios from 'axios'
import { StoreService } from 'src/modules/common/services/store.service'
import { HttpService } from '@nestjs/axios'

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
    console.log(from, to, 'from ,to')
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
      brandCode,
      bikeCode,
      license,
      serviceCode,
      storeCode,
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
      brandCode,
      storeCode : storeCode || null,
      bikeCode,
      serviceCode,
    }
    return await this.bookingRepository.save(data)
  }

  async getBookingFee(getBookingFeeDto: GetBookingFeeDto) {
    const { bookingAddress, storeCode } = getBookingFeeDto

    const store = await this.storeService.getOne(storeCode)
    //?api_key=Ib7L9Aqchp0rvybt7PKmEz0xkYTP2jLWMvQeYyyC&address=398 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú, Thành phố Hồ Chí Minh
    const url = 'https://rsapi.goong.io/geocode'
    const getLatLngBookingAddress = await this.httpService.axiosRef.get(url, {
      params: {
        address: bookingAddress,
        api_key: map_key,
      },
    })
    console.log(getLatLngBookingAddress.data?.results[0]?.geometry, 'dataa')
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
    const fee = distanceInKilomiter < 3 ? 0 : (distanceInKilomiter - 3) * 30000

    return Math.round(fee / 1000) * 1000
  }
}
