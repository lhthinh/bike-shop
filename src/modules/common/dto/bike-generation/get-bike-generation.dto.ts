import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetBikeGenerationDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Trim()
  search: string
}
