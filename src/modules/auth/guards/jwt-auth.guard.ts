import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import _ from 'lodash'
import { JWT_PUBLIC_KEY } from 'src/common/configs/app.config'
import { UserModel } from 'src/common/models/user.model'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(JWT_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserModel>(token, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET_KEY'),
      })

      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return await new Promise(async (resolve, reject) => {
      try {
        const active = await super.canActivate(context)

        resolve(active as boolean)
      } catch (error) {
        reject(error)
      }
    })
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return _.eq(type, 'Bearer') ? token : undefined
  }
}
