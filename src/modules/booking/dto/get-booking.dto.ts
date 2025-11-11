import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'
import { EBookingAt } from '../booking.enum'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'

export class GetBookingDto extends PaginationDTO{
  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  statusCode: string

  @ApiProperty({ enum: EBookingAt, example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  type: number
}
