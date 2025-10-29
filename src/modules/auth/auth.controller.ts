import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { Public } from 'src/common/decorators/public.decorator'
import { LoginDto } from './dto/login.dto'

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Request() req: ExpressRequest) {
    console.log("controller")
    return await this.authService.login(req.user)
  }
}
