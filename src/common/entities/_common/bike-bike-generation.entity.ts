import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Bike } from './bike.entity'
import { BikeGeneration } from './bike-generation.entity'

@Entity({
  // schema: '_common',
  name: 'bike_bike_generation',
})
export class BikeBikeGeneration extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'bike_generation_id', type: 'varchar' })
  bikeGenerationId: string

  @ManyToOne(() => BikeGeneration, (type) => type.bikeBikeGeneration)
  @JoinColumn({ name: 'bike_generation_id', referencedColumnName: 'id' })
  bikeGeneration: BikeGeneration

  @Column({ name: 'bike_id', type: 'varchar' })
  bikeId: string

  @ManyToOne(() => Bike, (type) => type.bikeBikeGeneration)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike
}
