export interface ErrorMsg {
  code: string;
  msg: string;
}

export class Exception extends Error {
  errorCode: string;
  httpStatus: number;
  constructor(code:string,msg:string,status=0) {
    super(msg);
    this.httpStatus = status;
    this.errorCode = code;
  }
}

export class BadReqException extends Exception {
  constructor(code:string,msg:string) {
    super(code,msg,400);
  }
}

export class AuthException extends Exception {
  constructor() {
    super("AUTH_FAILED","认证失败",401);
  }
}

export class ForbiddenException extends Exception {
  constructor() {
    super("FORBIDDEN","禁止访问",403);
  }
}