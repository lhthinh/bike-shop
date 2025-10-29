import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { AccountService } from '../account/account.service'
import { comparePassword } from 'src/common/utils/bcrypt.util'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  async authentication(loginDto: LoginDto) {
    const { username, password } = loginDto
    const account = await this.accountService.findOneByUserName(username)
    if (!account) {
      throw new UnauthorizedException('Không tồn tại tài khoản ')
    }

    const checkPass = await comparePassword(password, account.password)
    if (!checkPass) {
      throw new UnauthorizedException('Mật khẩu không chính xác')
    }
    const user = await this.userService.findOneByCode(account.userCode)
    return {
      ...user,
      username: account.username,
    }
  }

  async generateToken(user: Record<string, any>) {
    const payload = user
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: parseInt(
          this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: parseInt(
          this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        ),
      }),
    ])

    const decodedAccessToken = await this.jwtService.decode(accessToken)
    const { exp } = decodedAccessToken

    return {
      tokenType: 'Bearer',
      expiresAt: exp,
      expiresIn: parseInt(
        this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      ),
      accessToken,
      refreshToken,
      user,
    }
  }

  async login(user: any) {
    return await this.generateToken(user)
  }
}
