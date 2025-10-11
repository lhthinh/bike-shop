import { Body, Controller, Post } from '@nestjs/common'
import { BookingService } from '../services/booking.service'
import { CreateBookingDto } from '../dto/create-booking.dto'
import { GetBookingFeeDto } from '../dto/get-booking-fee.dto '
import { GetDistanceDto } from '../dto/get-distance.dto '

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.createBooking(createBookingDto)
  }

  @Post('fee')
  async getBookingFee(@Body() getBookingFee: GetBookingFeeDto) {
    return await this.bookingService.getBookingFee(getBookingFee)
  }
}
