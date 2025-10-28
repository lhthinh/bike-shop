import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModuleAsyncOptions } from '@nestjs/jwt'

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  global: true,
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET_KEY'),
      signOptions: {
        expiresIn: parseInt(configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRES_IN')),
      },
    }
  },
}
