import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiNotImplementedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { VerifiedTokenErrorDto } from './dto/verified-token-error.dto';
import { RolesGuard } from './roles.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiUnauthorizedResponse({
      type: VerifiedTokenErrorDto,
    }),
    ApiNotImplementedResponse({
      type: VerifiedTokenErrorDto,
    }),
    ApiBadRequestResponse({
      type: VerifiedTokenErrorDto,
    }),
    ApiForbiddenResponse({
      type: VerifiedTokenErrorDto,
    }),
  );
}
