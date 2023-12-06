import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './decorators/public-route-decorator';
import { Unauthorized } from '@app/use-cases/errors/unauthorized';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context)
  }

  handleRequest(err: null | Error, user: any, info: any) {
    if (err || !user) {
      throw new Unauthorized('Invalid token')
    }
    return user; // if jwt token is valid this user is the object returned from jwt.strategy validate() function
  }

}
