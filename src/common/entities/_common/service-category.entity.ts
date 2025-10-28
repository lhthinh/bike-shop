import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Service } from './service.entity'

@Entity({
  // schema: '_common',
  name: 'service_category',
})
export class ServiceCategory extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @OneToMany(() => Booking, (booking) => booking.service)
  booking: Booking[]

  @OneToMany(() => Service, (service) => service.serviceCategory)
  service: Service[]
}
