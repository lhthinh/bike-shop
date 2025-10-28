import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from 'src/common/entities/_user/account.entity'
import { AccountModule } from '../account/account.module'
import { User } from 'src/common/entities/_user/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Account]), AccountModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
