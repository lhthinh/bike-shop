import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { Account } from './account.entity'

@Entity({
  // schema: '_user',
  name: 'user',
})
export class User extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'code', type: 'varchar', unique: true })
  code: string

  @Column({ name: 'full_name', type: 'varchar', unique: true })
  fullName: string

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string

  @OneToOne(() => Account, (account) => account.userCode)
  account: Account
}
