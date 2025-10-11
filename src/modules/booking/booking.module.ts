import { Module } from '@nestjs/common'
import { BookingController } from './controllers/booking.controller'
import { BookingService } from './services/booking.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from 'src/common/entities/_booking/booking.entity'
import { StoreService } from '../common/services/store.service'
import { CommonModule } from '../common/common.module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Booking]), CommonModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
