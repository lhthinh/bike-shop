import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import CoreEntity from '../core-entity'
import { BikeBikeService } from './bike-bike-service.entity'
import { Service } from './service.entity'

@Entity({
  // schema: '_common',
  name: 'bike_service',
})
export class BikesService extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'from_price', type: 'double precision', nullable: true })
  fromPrice: number

  @Column({ name: 'to_price', type: 'double precision', nullable: true })
  toPrice: number

  @Column({ name: 'from_time', type: 'double precision', nullable: true })
  fromTime: number

  @Column({ name: 'to_time', type: 'double precision', nullable: true })
  toTime: number

  @Column({ name: 'unit', type: 'integer', nullable: true })
  unit: number

  @OneToMany(() => BikeBikeService, (type) => type.bikeService)
  bikeBikeService: BikeBikeService[]

  @Column({ name: 'service_id', type: 'varchar', nullable: true })
  serviceId: string

  @ManyToOne(() => Service, (type) => type.bikeServices)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: Service
}
