import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Booking } from '../_booking/booking.entity'

@Entity({
  // schema: '_common',
  name: 'service',
})
export class Service extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'code', type: 'varchar', unique: true })
  code: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => Booking, (booking) => booking.service)
  booking: Booking[]
}
