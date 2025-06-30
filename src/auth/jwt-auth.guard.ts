import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const can = await super.canActivate(context);
    if (!can) return false;

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    const user = req.user;
    if (!token || !user) return false;

    const session = await this.prisma.session.findFirst({
      where: { userId: user.id, token },
    });
    if (!session) return false;

    return true;
  }
}
