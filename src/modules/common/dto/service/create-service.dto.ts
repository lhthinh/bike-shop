import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateServiceDto {
  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  name: string

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Type(() => Number)
  price: number

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  description: string
}
