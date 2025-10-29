import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Bike } from './bike.entity'
import { BikeCapacity } from './bike-capacity.entity'

@Entity({
  // schema: '_common',
  name: 'capacity',
})
export class Capacity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => BikeCapacity, (type) => type.capacity)
  bikeCapacity: BikeCapacity[]
}
