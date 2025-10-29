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
import { Capacity } from './capacity.entity'

@Entity({
  // schema: '_common',
  name: 'bike_capacity',
})
export class BikeCapacity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'capacity_id', type: 'varchar' })
  capacityId: string

  @ManyToOne(() => Capacity, (type) => type.bikeCapacity)
  @JoinColumn({ name: 'capacity_id', referencedColumnName: 'id' })
  capacity: Capacity

  @Column({ name: 'bike_id', type: 'varchar' })
  bikeId: string

  @ManyToOne(() => Bike, (type) => type.bikeBikeGeneration)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike
}
