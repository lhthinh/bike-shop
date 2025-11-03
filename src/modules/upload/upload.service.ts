import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { unlink } from 'fs'
import path from 'path'
import { Upload } from 'src/common/entities/_upload/upload.entity'
import { Repository } from 'typeorm'
import fs from 'fs'
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async upload(path: string) {
    return await this.uploadRepository.save({ path })
  }

  async uploadProduct(path: string, productId: string) {
    return await this.uploadRepository.save({ path, productId })
  }

  async uploadServiceImage(path: string, serviceId: string) {
    return await this.uploadRepository.save({
      path,
      uploadServiceImageId: serviceId,
    })
  }

  async uploadServiceVideo(path: string, serviceId: string) {
    return await this.uploadRepository.save({
      path,
      uploadServiceVideoId: serviceId,
    })
  }

  async removeUploadProduct(productId: string) {
    const file = await this.uploadRepository.findOneBy({ productId })
    if (file) {
      await this.uploadRepository.remove(file)
      unlink(file.path, (error) => {
        console.log(error)
      })
    }
  }

  async removeUploadImageService(serviceId?: string) {
    const file = await this.uploadRepository.findOneBy({
      uploadServiceImageId: serviceId,
    })
    if (file) {
      await this.uploadRepository.remove(file)

      unlink(file.path, (error) => {})
    }
  }

  async removeUploadVideoService(serviceId?: string) {
    const file = await this.uploadRepository.findOneBy({
      uploadServiceVideoId: serviceId,
    })
    if (file) {
      await this.uploadRepository.remove(file)
      unlink(file.path, (error) => {})
    }
  }

  async getImageProduct() {
    const result = []
    const files = fs.readdirSync(
      path.join(__dirname, '..', '..', '..', 'files', 'product'),
    )
    for await (const file of files) {
      result.push('/files/product/' + file)
    }
    return result
  }
}
