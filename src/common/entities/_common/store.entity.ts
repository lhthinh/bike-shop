import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'

@Entity({
  // schema: '_common',
  name: 'store',
})
export class Store extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'lat', type: 'double precision' })
  lat: number

  @Column({ name: 'lng', type: 'double precision' })
  lng: number

  @OneToMany(() => Booking, (booking) => booking.store)
  booking: Booking[]
}
