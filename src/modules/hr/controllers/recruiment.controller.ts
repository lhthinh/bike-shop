import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { RecruimentService } from '../services/recruiment.service'
import { CreateRecruitmentDto } from '../dtos/recruitment/create-recruitment.dto'
import { ApiConsumes } from '@nestjs/swagger'
import { uploadRecruitmentImage } from 'src/common/configs/multer.config'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('recruiment')
export class RecruimentController {
  constructor(private readonly recruimentService: RecruimentService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('upload', uploadRecruitmentImage))
  @Post('apply')
  async create(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    return await this.recruimentService.create(createRecruitmentDto)
  }
}
