import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, Max, MaxLength, Min } from 'class-validator'

export class PaginationDTO {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  page?: number

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number
}
