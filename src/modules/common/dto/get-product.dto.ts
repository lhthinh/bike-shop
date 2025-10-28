import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetProductDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Trim()
  search: string
}
