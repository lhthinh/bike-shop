import { SwaggerCustomOptions } from '@nestjs/swagger'

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    docExpansion: 'none', // Expance all tags
    persistAuthorization: true, // Token đã add sẽ không bị xóa khi refresh lại page
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
  useGlobalPrefix: true,
  customSiteTitle: 'Ant Motor API Docs',
}
