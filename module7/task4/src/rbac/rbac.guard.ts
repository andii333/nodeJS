import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (
      !user ||
      !user.roles ||
      !this.hasRequiredRoles(user.roles, requiredRoles)
    ) {
      throw new ForbiddenException('You do not have the necessary permissions');
    }

    return true;
  }

  ROLE_HIERARCHY = {
    admin: ['manager', 'user'],
    manager: ['user'],
    user: [],
  };

  private hasRequiredRoles(
    userRoles: string[],
    requiredRoles: string[],
  ): boolean {
    return requiredRoles.some(
      (role) =>
        userRoles.includes(role) ||
        userRoles.some((userRole) =>
          this.ROLE_HIERARCHY[userRole]?.includes(role),
        ),
    );
  }
}
