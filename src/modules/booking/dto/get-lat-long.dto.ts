import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class GetDistanceDto {
  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @Trim()
  @IsString()
  address: string
}
