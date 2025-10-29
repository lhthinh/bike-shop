import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Bike } from './bike.entity'
import { BikeBikeGeneration } from './bike-bike-generation.entity'

@Entity({
  // schema: '_common',
  name: 'bike_generation',
})
export class BikeGeneration extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => BikeBikeGeneration, (bike) => bike.bikeGeneration)
  bikeBikeGeneration: BikeBikeGeneration[]
}
