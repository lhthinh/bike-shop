import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import _ from 'lodash'
import { TypeORMError } from 'typeorm'
import { ZodError } from 'zod'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger()

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const context = host.switchToHttp()

    try {
      // Mặc định sẽ là status 500 và response sẽ là exception
      let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      let httpResponse: string | Record<string, any> = exception
      let httpError: string | ZodError['issues'] =
        httpResponse?.message || 'Lỗi máy chủ'
      let httpMessage = httpResponse?.message || 'Lỗi máy chủ'
      let httpData = null

      // Nếu là 1 zod exception
      if (exception instanceof ZodError) {
        httpStatus = HttpStatus.BAD_REQUEST
        httpMessage = exception?.message
        httpError = exception?.issues || []
      }

      // Nếu là 1 throttler exception
      // if (exception instanceof ThrottlerException) {
      //   httpStatus = HttpStatus.TOO_MANY_REQUESTS
      //   httpMessage = i18n?.t('translation.message.http.status.429')
      //   httpError = exception?.message
      // }

      // Nếu là 1 typeorm exception
      if (exception instanceof TypeORMError) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        httpMessage = 'Lỗi máy chủ'
        httpError = exception?.message
      }

      // Nếu là 1 type exception
      if (exception instanceof TypeError) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        httpMessage = 'Lỗi máy chủ'
        httpError = exception?.message
      }

      // Nếu là 1 http exception
      if (exception instanceof HttpException) {
        httpStatus = exception.getStatus()
        httpResponse = exception.getResponse()

        if (httpResponse && _.isPlainObject(httpResponse)) {
          const newHttpResponse = httpResponse as Record<string, any>

          /**
           * {
           *   "message": ...
           * }
           */
          if ('message' in newHttpResponse) {
            httpMessage = newHttpResponse.message
          } else {
            // 400
            if (exception instanceof BadRequestException) {
              httpMessage = 'Bad Request'
            }
            // 403
            if (exception instanceof ForbiddenException) {
              httpMessage =
                'Phát sinh lỗi, bạn không có quyền truy cập hoặc sai chứng thực'
            }
            // 500
            if (exception instanceof InternalServerErrorException) {
              httpMessage = 'Lỗi máy chủ'
            }
          }

          /**
           * {
           *   "error": ...
           * }
           */
          if ('error' in newHttpResponse) {
            httpError = newHttpResponse.error
          }

          /**
           * {
           *   "data": ...
           * }
           */
          if ('data' in newHttpResponse) {
            httpData = newHttpResponse.data
          }
        }
      }

      this.logger.error(
        JSON.stringify(exception, Object.getOwnPropertyNames(exception)),
      )

      const body = {
        status: httpStatus,
        code: -1,
        message: httpMessage,
        error: httpError,
        data: httpData,
      }

      this.logger.error(JSON.stringify(body))

      httpAdapter.reply(context.getResponse(), body, httpStatus)
    } catch (error) {
      const body = {
        status: HttpStatus.BAD_REQUEST,
        code: -1,
        message: 'Bad Request',
        error: (exception as Record<string, any>)?.message || error,
        data: null,
      }

      httpAdapter.reply(
        context.getResponse(),
        body,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
