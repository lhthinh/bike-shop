import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { RecruitmentType } from './recruitment-type.entity'

@Entity({
  // schema: "_recruiment"
  name: 'recruitment',
})
export class Recruitment extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'title', type: 'varchar' })
  title: string

  @Column({ name: 'description', type: 'varchar' })
  description: string

  @Column({ name: 'recruitment_type_id', type: 'varchar' })
  recruitmentTypeId: string

  @ManyToOne(() => RecruitmentType, (type) => type.recruitment)
  @JoinColumn({ name: 'recruitment_type_id', referencedColumnName: 'id' })
  recruitmentType: RecruitmentType
}
