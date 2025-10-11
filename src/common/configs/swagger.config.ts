import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import _ from 'lodash'
import { EEnvironment } from '../enums/environment.enum'
import { ENVIRONMENT, PREFIX_PATH } from './app.config'

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('Ant Motor Api')
  .setVersion('1.0')
  .addServer('/')
  .addServer(
    (() => {
      switch (ENVIRONMENT) {
        case EEnvironment.Development: {
          return '/'
        }
        case EEnvironment.Sit: {
          return '/api'
        }
        case EEnvironment.Uat: {
          return '/api'
        }
        case EEnvironment.Production: {
          return '/api'
        }
        default: {
          return `${PREFIX_PATH}`
        }
      }
    })(),
  )
  .addBearerAuth()
  .build()
