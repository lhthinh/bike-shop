import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    if (req.body && req.body.password === '') {
      req.body.password = '__EMPTY__'
    }

    return (await super.canActivate(context)) as boolean
  }
}
