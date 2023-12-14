export class Exception extends Error {
  code: string;
  httpStatus: number;
  constructor(status:number,[code, msg]: string[]) {
    super(msg);
    this.httpStatus = status;
    this.code = code;
  }
}

export class BadReqException extends Exception {
  constructor(msg:string,opts?:{code?:string}) {
    const code = opts?.code || "BAD_REQUEST"
    super(400,[code,msg])
  }
}

export class AuthException extends Exception {
  constructor() {
    super(401,["AUTH","认证失败"])
  }
}

export class ForbiddenException extends Exception {
  constructor() {
    super(403,["FORBIDDEN","无权限"])
  }
}