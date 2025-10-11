import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'

@Entity({
  // schema: '_common',
  name: 'brand',
})
export class Brand extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'code', type: 'varchar', unique: true })
  code: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => Booking, (booking) => booking.brand)
  booking: Booking[]
}
