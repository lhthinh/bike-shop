import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateBikeGenerationDto {
  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  @Trim()
  name: string
}
