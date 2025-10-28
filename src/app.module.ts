import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { configConfig } from './common/configs/config.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmAsyncConfig } from './common/configs/typeorm.config'
import { CommonModule } from './modules/common/common.module'
import { BookingModule } from './modules/booking/booking.module'
import { UserModule } from './modules/user/user.module'
import { AccountModule } from './modules/account/account.module'
import { RecruimentModule } from './modules/recruiment/recruiment.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtAsyncConfig } from './common/configs/jwt.config'
import { UploadModule } from './modules/upload/upload.module'
import { MulterModule } from '@nestjs/platform-express'
import { multerConfig } from './common/configs/multer.config'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(configConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    JwtModule.registerAsync(jwtAsyncConfig),
    MulterModule.register(multerConfig), // Multer
    CommonModule,
    BookingModule,
    UserModule,
    AccountModule,
    RecruimentModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
