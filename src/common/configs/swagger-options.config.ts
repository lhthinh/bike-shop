import { SwaggerCustomOptions } from '@nestjs/swagger'

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    docExpansion: 'none',
  },
  useGlobalPrefix: true,
  explorer: false,
  customSiteTitle: 'Ant Motor API Docs',
}
