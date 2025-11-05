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

export class CreateBikeServiceDto {
  @ApiProperty({ example: [], required: false })
  @IsArray()
  @IsUUID('all', { each: true })
  bikeIds: string[]

  @ApiProperty({ example: '', required: false })
  @IsUUID()
  @Trim()
  serviceId: string

  @ApiProperty({ example: '', required: false })
  @IsNumber()
  @Type(() => Number)
  fromTime: number

  @ApiProperty({ example: '', required: false })
  @IsNumber()
  @Type(() => Number)
  toTime: number

  @ApiProperty({ example: '', required: false })
  @IsNumber()
  @Type(() => Number)
  fromPrice: number

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Trim()
  toPrice: number

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsEnum(EUnit)
  unit: number
}
