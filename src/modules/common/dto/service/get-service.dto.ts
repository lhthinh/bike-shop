import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetServiceDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Trim()
  search: string

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsString()
  @Trim()
  isDeleted: boolean
}
