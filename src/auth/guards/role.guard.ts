import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      'roles',
      [],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Faça login para continuar');
    }

    if (
      !user.roles ||
      !requiredRoles.some((role) => user.roles.includes(role))
    ) {
      throw new ForbiddenException(
        `Acesso negado! Peça para um ${requiredRoles.join('ou ')} liberar o seu acesso`,
      );
    }

    return true;
  }
}
