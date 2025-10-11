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
import { swaggerOptions } from './common/configs/swagger.config copy'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AllExceptionFilter } from './common/filters/all-exception.filter'

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO })
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: WinstonModule.createLogger(loggerConfig),
  })
  app.enableCors()
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)))
  app.useGlobalInterceptors(new TransformInterceptor())
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger-ui', app, document, swaggerOptions)
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT} and environment ${ENVIRONMENT}`)
  })
}
bootstrap()
