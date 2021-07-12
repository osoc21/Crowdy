import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthenticationError } from 'apollo-server-core';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const result = await super.canActivate(new ExecutionContextHost([req]));
    if (!result || !req.user) {
      return false;
    }
    const user = req.user;
    const hasRole = () => user.roles.some(role => roles.includes(role));
    return user && user.roles && hasRole();

    // const hasRole = () =>
    //   user.roles.some((role) => !!roles.find(item => item === role));
    // return user && user.roles && hasRole();
  }

  matchRoles(roles: string[], userRoles: string): boolean {
    return roles.includes(userRoles);
  }
}
