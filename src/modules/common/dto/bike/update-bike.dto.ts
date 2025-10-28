import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { PaginationDTO } from 'src/common/dtos/pagination.dto'
import { Trim } from 'src/common/libs/class-tranformer/decorator'
import { CreateBikeDto } from './create-bike.dto'

export class UpdateBikeDto extends CreateBikeDto {}
