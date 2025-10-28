import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Account } from 'src/common/entities/_user/account.entity'
import { Transactional } from 'typeorm-transactional'
import { AccountService } from '../account/account.service'
import { encryptPassword } from 'src/common/utils/bcrypt.util'
import { User } from 'src/common/entities/_user/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {}
  @Transactional()
  async create(createUserDto: CreateUserDto) {
    const { code, fullName, password, phoneNumber, username } = createUserDto

    const checkAccountExist =
      await this.accountService.checkAccountExistByUserName(username)
    if (checkAccountExist) {
      throw new BadRequestException('Tài khoản đã tồn tài')
    }
    const newUser = await this.userRepository.save({
      fullName,
      code,
      phoneNumber,
    })

    await this.accountRepository.save({
      username,
      password: await encryptPassword(password),
      userCode: newUser.code,
    })

    return newUser
  }

  async findOneByCode(code: string) {
    return await this.userRepository.findOne({
      where: {
        code,
      },
    })
  }
}
