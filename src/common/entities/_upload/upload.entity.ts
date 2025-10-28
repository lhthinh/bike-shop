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

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean
}
