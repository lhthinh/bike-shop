import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JobApplicationService } from '../services/job-application.service'
import { CreateJobApplicationDto } from '../dtos/job-application/create-job-application.dto'

@ApiTags('Job Application')
@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post('apply')
  async create(createJobApplicationDto: CreateJobApplicationDto) {
    return await this.jobApplicationService.create(createJobApplicationDto)
  }
}
