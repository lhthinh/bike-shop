import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Bike } from './bike.entity'

@Entity({
  // schema: '_common',
  name: 'capacity',
})
export class Capacity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => Bike, (bike) => bike.capacity)
  bike: Bike[]
}
