import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Brand } from '../_common/brand.entity'
import { Bike } from '../_common/bike.entity'
import { Store } from '../_common/store.entity'
import { Service } from '../_common/service.entity'

@Entity({
  // schema: '_booking',
  name: 'booking',
})
export class Booking extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'type', type: 'integer', comment: 'Type đặt lịch' })
  type: number

  @Column({ name: 'full_name', type: 'varchar', comment: 'Họ và tên' })
  fullName: string

  @Column({ name: 'phone_number', type: 'varchar', unique: true })
  phoneNumber: string

  @Column({ name: 'license', type: 'varchar', unique: true })
  license: string

  @Column({ name: 'booking_from', type: 'timestamptz', nullable: true })
  bookingFrom: Date

  @Column({ name: 'booking_to', type: 'timestamptz', nullable: true })
  bookingTo: Date

  @Column({ name: 'note', type: 'varchar', nullable: true })
  note: string

  @Column({ name: 'booking_address', type: 'varchar', nullable: true })
  bookingAddress: string

  @ManyToOne(() => Brand, (brand) => brand.booking)
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
  brand: Brand

  @Column({ name: 'brand_id', type: 'varchar', nullable: true })
  brandId: string

  @ManyToOne(() => Bike, (bike) => bike.booking)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike

  @Column({ name: 'bike_id', type: 'varchar', nullable: true })
  bikeId: string

  @ManyToOne(() => Store, (store) => store.booking)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store

  @Column({
    name: 'store_id',
    type: 'varchar',
    nullable: true,
  })
  storeId: string

  @ManyToOne(() => Service, (service) => service.booking)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: Service

  @Column({ name: 'service_id', type: 'varchar', nullable: true })
  serviceId: string
}
