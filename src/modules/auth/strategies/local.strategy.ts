import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string) {
    if (password === '__EMPTY__') password = ''
    const user = await this.authService.authentication({ username, password })
    if (!user) {
      throw new UnauthorizedException('Không xác thực')
    }

    return user
  }
}
