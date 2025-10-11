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

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(configConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CommonModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
