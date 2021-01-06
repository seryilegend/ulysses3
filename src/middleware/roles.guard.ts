import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DecodedTokenDto } from './dto/decoded-token.dto';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { DecodedToken } from './decoded-token.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private static getToken(
    @DecodedToken() decoded: DecodedTokenDto,
  ): DecodedTokenDto {
    return decoded;
  }

  private static getTokenWrapper(): DecodedTokenDto {
    return this.getToken(null);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const decoded: DecodedTokenDto = RolesGuard.getTokenWrapper();
    return requiredRoles.some((role: Role): boolean =>
      decoded.role.includes(role),
    );
  }
}
