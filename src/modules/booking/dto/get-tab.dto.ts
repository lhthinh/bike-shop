import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class GetTabDto {
  @ApiProperty({ example: '' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  type: string
}
