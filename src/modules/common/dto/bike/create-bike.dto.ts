import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'
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

  @ApiProperty({ example: [], required: false })
  @IsArray()
  @IsUUID()
  capacityIds: string[]

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsUUID()
  bikeTypeId: string

  @ApiProperty({ example: [], required: false })
  @IsArray()
  @IsUUID()
  bikeGenerationIds: string[]
}
