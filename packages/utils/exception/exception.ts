export interface ErrorMsg {
  code: string;
  msg: string;
}

export class Exception extends Error {
  errorCode: string;
  httpStatus: number;
  constructor(status:number,opts?:ErrorMsg) {
    super(opts.msg);
    this.httpStatus = status;
    this.errorCode = opts.code;
  }
}

export class BadReqException extends Exception {
  constructor(msg:string,opts?:{code?:string}) {
    const code = opts?.code || "BAD_REQUEST"
    super(400,{code,msg})
  }
}

export class AuthException extends Exception {
  constructor() {
    super(401,{code:"UNAUTHORIZED",msg:"未授权"})
  }
}

export class ForbiddenException extends Exception {
  constructor() {
    super(403,{code:"FORBIDDEN",msg:"禁止访问"})
  }
}