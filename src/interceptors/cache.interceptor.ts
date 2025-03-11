import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const cacheKey = info.fieldName;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(cacheKey, data);
      }),
    );
  }
}