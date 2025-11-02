import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { BikeBikeGeneration } from './bike-bike-generation.entity'
import { Bike } from './bike.entity'
import { Service } from './service.entity'

@Entity({
  // schema: '_common',
  name: 'bike_service',
})
export class BikesService extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'from_price', type: 'double precision' })
  fromPrice: number

  @Column({ name: 'to_price', type: 'double precision' })
  toPrice: number

  @Column({ name: 'from_time', type: 'double precision' })
  fromTime: number

  @Column({ name: 'to_time', type: 'double precision' })
  toTime: number

  @Column({ name: 'type', type: 'varchar' })
  type: string

  @Column({ name: 'bike_id', type: 'varchar' })
  bikeId: string

  @ManyToOne(() => Bike, (type) => type.bikeServices)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike

  @Column({ name: 'service_id', type: 'varchar' })
  serviceId: string

  @ManyToOne(() => Service, (type) => type.bikeServices)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: Service
}
