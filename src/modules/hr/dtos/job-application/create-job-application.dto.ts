import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateJobApplicationDto {
  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  fullName: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  phone: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  email: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  dob: string

  @ApiProperty({ example: '' })
  @IsNumber()
  gender: number
}
