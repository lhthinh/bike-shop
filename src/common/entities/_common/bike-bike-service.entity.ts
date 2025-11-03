import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import CoreEntity from '../core-entity'
import { BikesService } from './bike-service.entity'
import { Bike } from './bike.entity'

@Entity({
  // schema: '_common',
  name: 'bike_bike_service',
})
export class BikeBikeService extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'bike_id', type: 'varchar' })
  bikeId: string

  @ManyToOne(() => Bike, (type) => type.bikeBikeServices)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike

  @Column({ name: 'bike_service_id', type: 'varchar' })
  bikeServiceId: string

  @ManyToOne(() => BikesService, (type) => type.bikeBikeService)
  @JoinColumn({ name: 'bike_service_id', referencedColumnName: 'id' })
  bikeService: BikesService
}
