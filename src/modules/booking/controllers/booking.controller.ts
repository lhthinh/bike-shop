import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateBookingDto } from '../dto/create-booking.dto'
import { GetBookingFeeDto } from '../dto/get-booking-fee.dto '
import { GetBookingDto } from '../dto/get-booking.dto'
import { BookingService } from '../services/booking.service'

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async get(@Query() getBookingDto: GetBookingDto) {
    return await this.bookingService.find(getBookingDto)
  }

  // @Get('status-tab')
  // async getStatusTab(@Query() getStatusTabDto: GetStatusTabDto) {
  //   return await this.bookingService.getStatusTab(getStatusTabDto)
  // }

  @Post('')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.createBooking(createBookingDto)
  }

  @Post('fee')
  async getBookingFee(@Body() getBookingFee: GetBookingFeeDto) {
    return await this.bookingService.getBookingFee(getBookingFee)
  }
}
