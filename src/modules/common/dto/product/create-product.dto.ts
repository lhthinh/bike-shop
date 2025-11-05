import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateProductDto {
  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  name: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Trim()
  description: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Trim()
  productCategoryId: string

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price: number

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsString()
  uploadFile: string
}
