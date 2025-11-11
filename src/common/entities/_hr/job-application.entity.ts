import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CoreEntity from '../core-entity'
import { RecruitmentType } from './recruitment-type.entity'
import { Upload } from '../_upload/upload.entity'

@Entity({
  // schema: "_recruiment"
  name: 'job_application',
})
export class JobApplication extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string

  @Column({ name: 'phone', type: 'varchar' })
  phone: string

  @Column({ name: 'email', type: 'varchar' })
  email: string

  @Column({ name: 'dob', type: 'varchar' })
  dob: string

  @Column({ name: 'gender', type: 'int' })
  gender: number

  @Column({ name: 'title', type: 'varchar' })
  title: string

  @Column({ name: 'description', type: 'varchar' })
  description: string

  @Column({ name: 'upload_id', type: 'varchar', unique: true, nullable: true })
  uploadId: string

  @OneToOne(() => Upload, (upload) => upload.jobApplication)
  @JoinColumn([{ name: 'upload_id', referencedColumnName: 'id' }])
  upload: Upload

  @Column({ name: 'recruitment_type_id', type: 'varchar' })
  recruitmentTypeId: string

  @ManyToOne(() => RecruitmentType, (type) => type.recruitment)
  @JoinColumn({ name: 'recruitment_type_id', referencedColumnName: 'id' })
  recruitmentType: RecruitmentType
}
