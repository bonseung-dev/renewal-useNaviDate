import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function convertDatesToISOString(obj: any): any {
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(convertDatesToISOString);
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      obj[key] = convertDatesToISOString(obj[key]);
    }
  }
  return obj;
}

@Injectable()
export class DateToISOStringInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => convertDatesToISOString(data)));
  }
} 