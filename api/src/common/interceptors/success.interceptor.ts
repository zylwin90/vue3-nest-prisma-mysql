import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Response<T> {
  code: number;
  data: T;
  msg: string;
  timestamp: number;
}

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 1,
          data,
          msg: 'success',
          timestamp: dayjs().valueOf(),
        };
      }),
    );
  }
}
