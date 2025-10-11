import { Injectable } from '@nestjs/common'
import { GetServiceFeeDto } from './dto/get-service-fee.dto'

@Injectable()
export class ServicesService {
  async getServiceFee(getServiceFeeDto: GetServiceFeeDto) {
    const { bike, branch, service } = getServiceFeeDto
    return `Bạn đã đặt dịch vụ ${service}. Xe của bạn là hiệu ${branch} và tên là ${bike}`
  }
}
