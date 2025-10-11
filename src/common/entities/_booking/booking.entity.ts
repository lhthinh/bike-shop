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

@Entity({
  // schema: '_booking',
  name: 'booking',
})
export class Booking extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'type', type: 'varchar', comment: 'Type đặt lịch' })
  type: string

  @Column({ name: 'full_name', type: 'varchar', comment: 'Họ và tên' })
  fullName: string

  @Column({ name: 'phone_number', type: 'varchar', unique: true })
  phoneNumber: string

  @ManyToOne(() => Brand, (brand) => brand.booking)
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'code' })
  brandId: Brand

  @ManyToOne(() => Bike, (bike) => bike.booking)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'code' })
  bikeId: Bike

  @Column({ name: 'bookingDate', type: 'timestamptz' })
  bookingDate: Date

  @Column({ name: 'note', type: 'varchar', nullable: true })
  note: string
}
