import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetBikeDto extends PaginationDTO {
  @ApiProperty({ example: '' })
  @IsString()
  @Trim()
  search: string
}
