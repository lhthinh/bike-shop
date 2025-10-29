import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Bike } from './bike.entity'

@Entity({
  // schema: '_common',
  name: 'bike_type',
})
export class BikeType extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => Bike, (bike) => bike.bikeType)
  bike: Bike[]
}
