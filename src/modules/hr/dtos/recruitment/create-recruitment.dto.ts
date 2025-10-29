import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateCapacityDto {
  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  name: string
}
