import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { I18nContext } from 'nestjs-i18n'
import { map, Observable } from 'rxjs'

export interface ResponseInterceptor<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseInterceptor<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseInterceptor<T>> {
    const http = context.switchToHttp()
    const response = http.getResponse<Response>()
    const { statusCode } = response
    
    return next.handle().pipe(
      map(data => {
        const { responseMessage, responseData, resultCode } = data || {}
        return {
          status: statusCode,
          code: resultCode || 1,
          message: responseMessage || "Thao tác thành công",
          error: null,
          data: responseData || data,
        }
      }),
    )
  }
}
