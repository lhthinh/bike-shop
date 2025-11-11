import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Booking } from '../_booking/booking.entity'
import { Product } from '../_common/product.entity'
import { ETypeFile } from 'src/common/enums/type-image.enum'
import { Service } from '../_common/service.entity'
import { JobApplication } from '../_hr/job-application.entity'

@Entity({
  // schema: '_file',
  name: 'upload',
})
export class Upload extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'path', type: 'varchar' })
  path: string

  @Column({ name: 'product_id', type: 'varchar', nullable: true })
  productId: string

  @OneToOne(() => Product, (product) => product.upload)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product

  @Column({ name: 'service_image_id', type: 'varchar', nullable: true })
  uploadServiceImageId: string

  @OneToOne(() => Service, (type) => type.uploadImage)
  @JoinColumn([{ name: 'service_image_id', referencedColumnName: 'id' }])
  uploadServiceImage: Service

  @Column({ name: 'service_video_id', type: 'varchar', nullable: true })
  uploadServiceVideoId: string

  @OneToOne(() => Service, (type) => type.uploadVideo)
  @JoinColumn([{ name: 'service_image_id', referencedColumnName: 'id' }])
  uploadServiceVideo: Service

  @Column({ name: 'job_application_id', type: 'varchar', nullable: true })
  jobApplicationId: string

  @OneToOne(() => JobApplication, (type) => type.upload)
  @JoinColumn([{ name: 'job_application_id', referencedColumnName: 'id' }])
  jobApplication: JobApplication

  @Column({ name: 'recruitment_id', type: 'varchar', nullable: true })
  recruitmentId: string

  @OneToOne(() => JobApplication, (type) => type.upload)
  @JoinColumn([{ name: 'recruitment_id', referencedColumnName: 'id' }])
  recruitment: JobApplication
}
