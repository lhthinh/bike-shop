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
  @JoinColumn({ name: 'brand_code', referencedColumnName: 'code' })
  brand: Brand

  @Column({ name: 'brand_code', type: 'varchar', nullable: true })
  brandCode: string

  @ManyToOne(() => Bike, (bike) => bike.booking)
  @JoinColumn({ name: 'bike_code', referencedColumnName: 'code' })
  bike: Bike

  @Column({ name: 'bike_code', type: 'varchar', nullable: true })
  bikeCode: string

  @ManyToOne(() => Store, (store) => store.booking)
  @JoinColumn({ name: 'store_code', referencedColumnName: 'code' })
  store: Store

  @Column({
    name: 'store_code',
    type: 'varchar',
    nullable: true,
  })
  storeCode: string

  @ManyToOne(() => Service, (service) => service.booking)
  @JoinColumn({ name: 'service_code', referencedColumnName: 'code' })
  service: Service

  @Column({ name: 'service_code', type: 'varchar', nullable: true })
  serviceCode: string
}
