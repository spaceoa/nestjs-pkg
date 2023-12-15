import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadReqException } from '../exception';

@Injectable()
export class ValidatePipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length > 0) {
      const err = errors[0];
      const code = 'PARAMS';
      const msg = `【${err.property}】${Object.values(err.constraints)[0]}`;
      throw new BadReqException(code, msg);
    }
    return value;
  }
}
