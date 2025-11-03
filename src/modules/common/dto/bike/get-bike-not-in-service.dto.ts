import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'
import { GetBikeDto } from './get-bike.dto'

export class GetBikeNotInServiceDto extends GetBikeDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Trim()
  serviceId: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Trim()
  bikeServiceId: string
}
