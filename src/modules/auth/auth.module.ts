import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { AccountModule } from '../account/account.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [PassportModule, AccountModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    JwtAuthGuard,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
