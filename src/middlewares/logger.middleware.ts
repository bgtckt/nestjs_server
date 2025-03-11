import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    if (req?.body?.operationName !== 'IntrospectionQuery') {
      console.log(`[Request] ${req.method} ${req.originalUrl}`);
    };
    next();
  }
}