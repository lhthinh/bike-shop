import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ENVIRONMENT, PORT } from './common/configs/app.config'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './common/configs/swagger.config'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AllExceptionFilter } from './common/filters/all-exception.filter'
import { swaggerOptions } from './common/configs/swagger-options.config'
import path from 'path'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO })
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: WinstonModule.createLogger(loggerConfig),
  })
  app.enableCors()
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useStaticAssets(path.resolve('files', 'product'), {
    prefix: '/files/product/',
  })
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger-ui', app, document, swaggerOptions)
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT} and environment ${ENVIRONMENT}`)
  })
}
bootstrap()
