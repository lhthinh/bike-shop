import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { ParseBoolean, Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetServiceDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Trim()
  search: string

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @ParseBoolean()
  @IsBoolean()
  isDeleted: boolean
}
