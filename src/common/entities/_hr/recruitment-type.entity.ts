import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import CoreEntity from '../core-entity'
import { Recruitment } from './recruitment.entity'

@Entity({
  // schema: "_recruiment"
  name: 'recruitment_type',
})
export class RecruitmentType extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'type', type: 'varchar' })
  name: string

  @OneToMany(() => Recruitment, type => type.recruitmentType)
  recruitment: Recruitment[]
}
