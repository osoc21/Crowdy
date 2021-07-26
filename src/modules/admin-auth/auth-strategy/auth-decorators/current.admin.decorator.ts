import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Admin } from 'src/entities/admin/admin.entity';

export const CurrentAdmin = createParamDecorator(
  (data: unknown, context: ExecutionContext): Admin => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
