import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import * as Prisma from '@prisma/client';

type TypeUser = keyof Prisma.User;

export const User = createParamDecorator(
  (data: TypeUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
