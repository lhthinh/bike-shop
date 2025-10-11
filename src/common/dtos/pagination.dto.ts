import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, Max, MaxLength } from 'class-validator'

export class PaginationDTO {
  @ApiProperty({ description: 'Trang hiện tại', example: '1', required: false })
  @IsOptional()
  @Transform(({ value }) => value || 1)
  @Type(() => Number)
  @IsNumber()
  @Max(9999999999, { message: 'số vượt giới hạn cho phép' })
  page?: number

  @ApiProperty({
    description: 'Số lượng dữ liệu trên 1 trang',
    example: '20',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value || 20)
  @Type(() => Number)
  @IsNumber()
  @Max(9999999999, { message: 'số vượt giới hạn cho phép' })
  pageSize?: number
}
