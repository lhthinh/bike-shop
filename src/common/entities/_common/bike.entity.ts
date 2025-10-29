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
import { Brand } from './brand.entity'
import { Capacity } from './capacity.entity'
import { BikeBikeGeneration } from './bike-bike-generation.entity'
import { BikeType } from './bike-type.entity'
import { BikeCapacity } from './bike-capacity.entity'

@Entity({
  // schema: '_common',
  name: 'bike',
})
export class Bike extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'brand_id', type: 'varchar' })
  brandId: string

  @ManyToOne(() => Brand, (brand) => brand.bike)
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
  brand: Brand

  @Column({ name: 'bike_type_id', type: 'varchar' })
  bikeTypeId: string

  @ManyToOne(() => BikeType, (type) => type.bike)
  @JoinColumn({ name: 'bike_type_id', referencedColumnName: 'id' })
  bikeType: BikeType

  @OneToMany(() => Booking, (booking) => booking.bike)
  booking: Booking[]

  @OneToMany(() => BikeBikeGeneration, (type) => type.bike)
  bikeBikeGeneration: BikeBikeGeneration[]

  @OneToMany(() => BikeCapacity, (type) => type.bike)
  bikeCapacity: BikeCapacity[]
}
