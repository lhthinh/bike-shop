import { JWT_PUBLIC_KEY } from '../configs/app.config'
import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata(JWT_PUBLIC_KEY, true)
