import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { Trim } from 'src/common/libs/class-tranformer/decorator'

export class CreateUserDto {
  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  code: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  fullName: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  phoneNumber: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  password: string

  @ApiProperty({ example: '' })
  @IsString()
  @Type(() => String)
  @Trim()
  username: string
}
