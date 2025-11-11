import { Module } from '@nestjs/common'
import { BookingController } from './controllers/booking.controller'
import { BookingService } from './services/booking.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { StoreService } from '../common/services/store.service'
import { CommonModule } from '../common/common.module'
import { HttpModule } from '@nestjs/axios'
import { BookingStatus } from 'src/common/entities/_booking/booking-status.entity'
import { BookingStatusController } from './controllers/booking-status.controller'
import { BookingStatusService } from './services/booking-status.service'

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Booking, BookingStatus]),
    CommonModule,
  ],
  controllers: [BookingController, BookingStatusController],
  providers: [BookingService, BookingStatusService],
})
export class BookingModule {}
