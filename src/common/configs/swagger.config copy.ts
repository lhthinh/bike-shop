import { SwaggerCustomOptions } from '@nestjs/swagger'

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
  useGlobalPrefix: true,
  explorer: false,
  customSiteTitle: 'Ant Motor API Docs',
}
