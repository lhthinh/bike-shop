import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export default abstract class CoreEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date

  @Column({ name: 'created_by_code', type: 'varchar', nullable: true })
  createdByCode?: string

  @Column({ name: 'updated_by_code', type: 'varchar', nullable: true })
  updatedByCode?: string

  @Column({ name: 'deleted_by_code', type: 'varchar', nullable: true })
  deletedByCode?: string
}
