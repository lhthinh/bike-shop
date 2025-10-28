import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Booking } from '../_booking/booking.entity'
import CoreEntity from '../core-entity'
import { User } from './user.entity'

@Entity({
  // schema: '_user',
  name: 'account',
})
export class Account extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string

  @Column({ name: 'password', type: 'varchar' })
  password: string

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean

  @Column({ name: 'user_code', type: 'varchar', unique: true })
  userCode: string

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn([{ name: 'user_code', referencedColumnName: 'code' }])
  user: User
}
