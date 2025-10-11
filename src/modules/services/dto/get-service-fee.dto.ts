import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetServiceFeeDto {
  @ApiProperty({ example: '' })
  @IsString()
  service: String

  @ApiProperty({ example: '' })
  @IsString()
  branch: String

  @ApiProperty({ example: '' })
  @IsString()
  bike: String
}
