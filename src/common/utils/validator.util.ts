import { BadRequestException } from '@nestjs/common'
import _ from 'lodash'
import moment, { Moment } from 'moment'
import { I18nContext } from 'nestjs-i18n'
import { ENVIRONMENT } from '../configs/app.config'
import { EEnvironment } from '../enums/environment.enum'

export const isProduction = () => {
  return _.eq(ENVIRONMENT, EEnvironment.Production)
}

export const isJsonString = (text: string) => {
  try {
    JSON.parse(text)
  } catch {
    return false
  }

  return true
}

// Hàm kiểm tra xem một ngày có phải là thứ 7 hoặc chủ nhật không
export const isWeekend = (date: string | Moment) => {
  // Sử dụng moment để chuyển đổi ngày đầu vào
  const momentDate = moment(date)

  // Kiểm tra nếu là thứ 7 (6) hoặc chủ nhật (0)
  return _.eq(momentDate.day(), 6) || _.eq(momentDate.day(), 0)
}
