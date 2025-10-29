import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class LoginDto {
  @ApiProperty({ example: 'lhthinh1909' })
  @IsString()
  @Type(() => String)
  @Trim()
  username: string

  @ApiProperty({ example: '123456' })
  @IsString()
  @Type(() => String)
  @Trim()
  password: string
}
