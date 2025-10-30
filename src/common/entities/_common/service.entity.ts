import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Booking } from '../_booking/booking.entity'
import { ServiceCategory } from './service-category.entity'
import { BikeService } from './bike-service.entity'

@Entity({
  // schema: '_common',
  name: 'service',
})
export class Service extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'price', type: 'double precision', default: 0 })
  price: number

  @Column({ name: 'description', type: 'varchar', default: '' })
  description: string

  @Column({ name: 'service_category_id', type: 'varchar', nullable: true })
  serviceCategoryId: string

  @ManyToOne(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.service,
  )
  @JoinColumn({ name: 'service_category_id', referencedColumnName: 'id' })
  serviceCategory: ServiceCategory[]

  @OneToMany(() => Booking, (booking) => booking.service)
  booking: Booking[]

  @OneToMany(() => BikeService, (type) => type.service)
  bikeServices: BikeService[]
}
