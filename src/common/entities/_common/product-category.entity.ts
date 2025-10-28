import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { Booking } from '../_booking/booking.entity'
import { Product } from './product.entity'

@Entity({
  // schema: '_common',
  name: 'product_category',
})
export class ProductCategory extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'description', type: 'varchar', default: '' })
  description: string

  @OneToMany(() => Product, (product) => product.productCategory)
  product: Product[]
}
