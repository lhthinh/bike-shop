import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateBikeDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Trim()
  name: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsUUID()
  brandId: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsUUID()
  capacityId: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsUUID()
  bikeTypeId: string

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsUUID()
  bikeGenerationId: string
}
