import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Erro de token expirado');
      }
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Erro de token expirado');
      }
      if (info && info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Erro de token expirado');
      }
      if (info && info.message && info.message.includes('expired')) {
        throw new UnauthorizedException('Erro de token expirado');
      }
      if (info && info.message) {
        throw new UnauthorizedException(info.message);
      }
      throw new UnauthorizedException('Token inválido ou não fornecido');
    }

    return user;
  }
}
