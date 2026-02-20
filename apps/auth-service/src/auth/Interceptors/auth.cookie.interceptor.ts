import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        if (data?.access_token) {
          res.cookie('token', data?.access_token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/',
          });
          res.cookie('userId', data?.user.id, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/',
          });
          res.cookie('roles', data?.user.roles[0], {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/',
          });

          res.setHeader('X-Auth-Token', data.access_token);
          res.setHeader('X-Auth-UserId', data.user.id);
          res.setHeader('X-Auth-Roles', data.user.roles[0]);

          res.setHeader(
            'Access-Control-Expose-Headers',
            'X-Auth-Token, X-Auth-UserId, X-Auth-Roles',
          );
        }
        return data;
      }),
    );
  }
}
