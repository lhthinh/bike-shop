import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateBookingDto {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @Type(() => Number)
  type: number

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  fullName: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  phoneNumber: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  license: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => Date)
  @Trim()
  @IsString()
  bookingDate: Date

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  bookingTimeFrom: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  bookingTimeTo: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  note: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  brandId: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  bikeId: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  serviceId: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  storeId: string

  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  bookingAddress: string
}
