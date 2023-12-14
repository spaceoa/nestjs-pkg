import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { throwError } from "rxjs";
import { AuthException, Exception } from "../exception";

@Catch()
export class AllRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof AuthException) {
      return throwError(() => {
        return { status: exception.code, message: exception.message };
      });
    }
    if (exception instanceof Exception) {
      return throwError(() => {
        return { status: exception.code, message: exception.message };
      });
    }
    return super.catch(exception, host);
  }
}