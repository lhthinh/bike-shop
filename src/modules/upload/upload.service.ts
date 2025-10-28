import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { unlink } from 'fs'
import { Upload } from 'src/common/entities/_upload/upload.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async upload(path: string, isActive: boolean = true) {
    return await this.uploadRepository.save({ path, isActive })
  }

  async remove(path: string) {
    const file = await this.uploadRepository.findOneBy({ path })
    if (file) {
      unlink(path, (error) => {
        this.uploadRepository.save({ ...file, isActive: false })
      })
    }
  }
}
