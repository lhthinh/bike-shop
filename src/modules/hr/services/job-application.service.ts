import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Recruitment } from 'src/common/entities/_hr/recruitment.entity'
import { ILike, Repository } from 'typeorm'
import { GetRecruitmentDto } from '../dtos/recruitment/get-recruitment.dto'
import { CreateJobApplicationDto } from '../dtos/job-application/create-job-application.dto'

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(Recruitment)
    private readonly recruitmentRepository: Repository<Recruitment>,
  ) {}
  async find(getRecruitmentDto: GetRecruitmentDto) {
    const { search } = getRecruitmentDto
    return await this.recruitmentRepository.find({
      where: {},
    })
  }

  async create(createRecruitmentDto: CreateJobApplicationDto) {
    const { dob, email, fullName, gender, phone } = createRecruitmentDto
  }
}
