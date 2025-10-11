import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'
import { EEnvironment } from '../enums/environment.enum'
import path from 'path'
import _ from 'lodash'
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const host = configService.getOrThrow('POSTGRES_HOST')
    const port = parseInt(configService.getOrThrow('POSTGRES_PORT'))
    const database = configService.getOrThrow('POSTGRES_DATABASE')
    const forceSync = configService.get('POSTGRES_FORCE_SYNC') === 'true'
    console.log(path.join(__dirname, '..'), 'path.join')
    return {
      type: 'postgres',
      host,
      port,
      database,
      username: configService.getOrThrow('POSTGRES_USERNAME'),
      password: configService.getOrThrow('POSTGRES_PASSWORD'),
      entities: [path.join(__dirname, '..', '..', '**', '*.entity.{js,ts}')],
      subscribers: [path.join(__dirname, '..', '..', '**', '*.subscriber.{js,ts}')],
      synchronize:
        false ||
        (!_.includes(
          [EEnvironment.Production],
          configService.getOrThrow('NODE_ENV'),
        ) &&
          forceSync), // Tránh dùng trên production có thể gây mất dữ liệu
      logging: true,
    }
  },
  async dataSourceFactory(options) {
    if (!options) {
      throw new Error('Invalid options passed')
    }
    return addTransactionalDataSource(new DataSource(options)) // Để dùng @transaction
  },
}
