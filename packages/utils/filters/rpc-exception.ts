import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { throwError } from "rxjs";
import { AuthException, Exception, ForbiddenException } from "../exception";

@Catch()
export class AllRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof AuthException) {
      return throwError(() => {
        return { status: exception.errorCode, message: exception.message };
      });
    }
    if (exception instanceof Exception) {
      return throwError(() => {
        return { status: exception.errorCode, message: exception.message };
      });
    }
    return super.catch(exception, host);
  }
}

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof AuthException) {
      return throwError(() => {
        return { code: 16, message: exception.message };
      });
    }
    if (exception instanceof Exception) {
      return throwError(() => {
        return { code: 3, message: exception.message };
      });
    }
    if (exception instanceof ForbiddenException) {
      return throwError(() => {
        return { code: 7, message: exception.message };
      });
    }
    return throwError(() => {
      return { code: 2, message: exception.message };
    });
  }
}