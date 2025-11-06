import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'
import { EUnit } from '../../common.enum'

export class GetServiceFeeByBikeDto {
  @ApiProperty({ example: [], required: false })
  @IsUUID()
  @Trim()
  bikeId: string

  @ApiProperty({ example: '', required: false })
  @IsUUID()
  @Trim()
  serviceId: string
}
