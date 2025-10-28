import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from 'src/common/entities/_user/account.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async checkAccountExistByUserName(username: string) {
    const account = await this.accountRepository.findOne({
      where: { username },
    })
    if (account) {
      return true
    }
    return false
  }

  async findOneByUserName(username: string) {
    return await this.accountRepository.findOne({
      select: {
        password: true,
        username: true,
        userCode: true,
        id: true,
      },
      where: {
        isActive: true,
        username: username.trim().toLowerCase(),
      },
    })
  }
}
