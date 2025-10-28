import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class LoginDto {
  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  username: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  password: string
}
