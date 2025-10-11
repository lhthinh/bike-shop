import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateBookingDto {
  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  type: String

  @ApiProperty({
    example: '',
  })
  @IsString()
  fullName: String
}
