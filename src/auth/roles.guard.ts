import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import _ from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  private static readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    RolesGuard.logger.log(`엔드포인트에 필요한 Scope: ${roles}`);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    RolesGuard.logger.log(`인증토큰에 부여된 Scope: ${user.type}`);
    if (!user.type) {
      throw new ForbiddenException({
        code: 'forbidden',
        message: `리소스를 요청할 권한이 없습니다.`,
      });
    }

    const match = _.intersection(roles, [user.type]);
    RolesGuard.logger.log(`일치하는 Scope: ${match.join(',')}`);
    if (!match.length) {
      throw new ForbiddenException({
        code: 'forbidden',
        message: `리소스를 요청할 권한이 없습니다.`,
      });
    }

    return true;
  }
}
