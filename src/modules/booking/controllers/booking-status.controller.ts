import { Controller, Get, Query } from '@nestjs/common'
import { BookingStatusService } from '../services/booking-status.service'
import { ApiTags } from '@nestjs/swagger'
import { GetTabDto } from '../dto/get-tab.dto'

@ApiTags('Booking')
@Controller('booking-status')
export class BookingStatusController {
  constructor(private readonly bookingStatusService: BookingStatusService) {}

  @Get('init')
  async initStatus() {
    return await this.bookingStatusService.initStatus()
  }

  @Get('tab')
  async getTab(@Query() getTabDto: GetTabDto) {
    return await this.bookingStatusService.getTab(getTabDto)
  }
}
