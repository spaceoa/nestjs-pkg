import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Exception } from '../exception';

let errors:Record<string,string> = {
  "UNKNOWN": "未知错误",
}

export function setErrors(errs:Record<string, string>) {
  errors = Object.assign(errors, errs);
}

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let code = 'unknown';
    let msg = exception.message;
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception.code) {
      code = exception.details;
      msg = errors[code] || '未知错误';
      httpStatus = HttpStatus.BAD_REQUEST;
    }else if (exception.status) {
      // 用于处理RPC客户端的异常
      msg = exception.message;
      code = exception.status;
      httpStatus = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof Exception) {
      code = exception.errorCode;
      httpStatus = exception.httpStatus;
    } else {
      code = 'system';
      httpStatus = 500;
    }
    const responseBody = {
      code: code,
      msg: msg,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}


