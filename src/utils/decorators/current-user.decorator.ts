import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (key: keyof Users, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
  },
);
