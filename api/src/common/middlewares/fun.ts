import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FunMiddleware implements NestMiddleware {
 use(req: Request, res: Response, next: NextFunction) {
  //  console.log('方法中间件');
   next();
 }
}