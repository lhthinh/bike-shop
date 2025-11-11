import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Booking } from './booking.entity'

@Entity({
  // schema: '_booking',
  name: 'booking_status',
})
export class BookingStatus extends CoreEntity {
  @PrimaryColumn({ name: 'code', type: 'varchar' })
  code: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => Booking, (type) => type.status)
  booking: Booking[]
}
