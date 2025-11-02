import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Booking } from '../_booking/booking.entity'
import { ServiceCategory } from './service-category.entity'
import { BikesService } from './bike-service.entity'
import { Upload } from '../_upload/upload.entity'

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

  @Column({
    name: 'upload_image_id',
    type: 'varchar',
    nullable: true,
  })
  uploadImageId: string

  @OneToOne(() => Upload, (upload) => upload.product)
  @JoinColumn([{ name: 'upload_image_id', referencedColumnName: 'id' }])
  uploadImage: Upload

  @OneToOne(() => Upload, (upload) => upload.product)
  @JoinColumn([{ name: 'upload_video_id', referencedColumnName: 'id' }])
  uploadVideo: Upload

  @Column({
    name: 'upload_video_id',
    type: 'varchar',
    nullable: true,
  })
  uploadVideoId: string

  @Column({ name: 'service_category_id', type: 'varchar', nullable: true })
  serviceCategoryId: string

  @ManyToOne(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.service,
  )
  @JoinColumn({ name: 'service_category_id', referencedColumnName: 'id' })
  serviceCategory: ServiceCategory

  @OneToMany(() => Booking, (booking) => booking.service)
  booking: Booking[]

  @OneToMany(() => BikesService, (type) => type.service)
  bikeServices: BikesService[]
}
