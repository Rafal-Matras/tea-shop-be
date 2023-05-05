import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    @Inject(Reflector) private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = this.reflector.get<string>('auth_role', context.getHandler());

    if (!user) throw new Error('user is undefined?');

    return user.role === role;
  }
}
