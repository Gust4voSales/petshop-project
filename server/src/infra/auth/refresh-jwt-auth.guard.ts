import { Unauthorized } from '@app/use-cases/errors/unauthorized';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtGuard extends AuthGuard('jwt-refresh') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: null | Error, user: any, info: any) {
    if (err || !user) {
      throw new Unauthorized('Invalid refresh token')
    }
    return user; // if jwt token is valid this user is the object returned from refresh-jwt.strategy validate() function
  }

}

