import { Module } from '@nestjs/common'
import { RecruimentController } from './controllers/recruiment.controller'
import { RecruimentService } from './services/recruiment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecruitmentType } from 'src/common/entities/_hr/recruitment-type.entity'
import { Recruitment } from 'src/common/entities/_hr/recruitment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, RecruitmentType])],
  controllers: [RecruimentController],
  providers: [RecruimentService],
})
export class HRModule {}
