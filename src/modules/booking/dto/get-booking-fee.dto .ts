import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetBookingFeeDto {
  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsUUID()
  storeId: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  bookingAddress: string

  @ApiProperty({ example: true, default: true })
  @Type(() => Boolean)
  @IsBoolean()
  inOfficeTime: string
}
