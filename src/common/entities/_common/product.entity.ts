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
import { ProductCategory } from './product-category.entity'
import { Upload } from '../_upload/upload.entity'

@Entity({
  // schema: '_common',
  name: 'product',
})
export class Product extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'description', type: 'varchar', default: '' })
  description: string

  @Column({ name: 'price', type: 'double precision', nullable: true })
  price: number

  @Column({ name: 'product_category_id', type: 'varchar', nullable: true })
  productCategoryId: string

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  @JoinColumn({ name: 'product_category_id', referencedColumnName: 'id' })
  productCategory: ProductCategory

  @Column({ name: 'upload_id', type: 'varchar', unique: true, nullable: true })
  uploadId: string

  @OneToOne(() => Upload, (upload) => upload.product)
  @JoinColumn([{ name: 'upload_id', referencedColumnName: 'id' }])
  upload: Upload
}
