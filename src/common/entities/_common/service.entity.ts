import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'
import CoreEntity from '../core-entity'

@Entity({ schema: '_common', name: 'service' })
export class UserDevice extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'code', type: 'varchar', unique: true })
  code: string

  @Column({ name: 'name', type: 'varchar' })
  name: string
}
