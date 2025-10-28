import { Injectable } from '@nestjs/common'
import { JWT_ACCESS_TOKEN_SECRET_KEY } from 'src/common/configs/app.config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_ACCESS_TOKEN_SECRET_KEY,
    })
  }

  async validate(payload: any) {
    return payload
  }
}
