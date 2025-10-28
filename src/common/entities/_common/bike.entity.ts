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

  @Column({ name: 'capacity_id', type: 'varchar' })
  capacityId: string

  @ManyToOne(() => Capacity, (capacity) => capacity.bike)
  @JoinColumn({ name: 'capacity_id', referencedColumnName: 'id' })
  capacity: Capacity

  @Column({ name: 'bike_type_id', type: 'varchar' })
  bikeTypeId: string

  @ManyToOne(() => Capacity, (capacity) => capacity.bike)
  @JoinColumn({ name: 'bike_type_id', referencedColumnName: 'id' })
  bikeType: Capacity

  @Column({ name: 'bike_generation_id', type: 'varchar' })
  bikeGenerationId: string

  @ManyToOne(() => Capacity, (capacity) => capacity.bike)
  @JoinColumn({ name: 'bike_generation_id', referencedColumnName: 'id' })
  bikeGeneration: Capacity

  @OneToMany(() => Booking, (booking) => booking.bike)
  booking: Booking[]
}
