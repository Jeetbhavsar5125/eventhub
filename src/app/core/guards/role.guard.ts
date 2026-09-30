import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';
import { PlatformRole } from '../models/platform-role.enum';

/**
 * RoleGuard — protects routes that require a specific platform-level role.
 *
 * Usage in routes (pass required roles via route data):
 *   {
 *     path: 'admin',
 *     canActivate: [authGuard, roleGuard],
 *     data: { roles: [PlatformRole.Admin, PlatformRole.SuperAdmin] },
 *     loadComponent: () => ...
 *   }
 *
 * The guard uses `hasPlatformRoleOrAbove` so SuperAdmin always passes
 * any role requirement automatically.
 *
 * NOTE (Chunk 1): Returns `true` as a stub. In the Auth feature chunk
 * this will redirect to a /forbidden page on role mismatch.
 */
export const roleGuard: CanActivateFn = (route, _state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  const requiredRoles = route.data?.['roles'] as PlatformRole[] | undefined;

  // No roles specified on route — guard passes
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const user = authService.currentUser();

  // No authenticated user — defer to authGuard
  if (!user) {
    logger.debug('RoleGuard', 'No user present, deferring to authGuard');
    return true; // Stub: authGuard handles unauthenticated redirect
  }

  // Check if user holds at least one of the required roles
  const hasRole = requiredRoles.some((role) => authService.hasPlatformRoleOrAbove(role));

  if (!hasRole) {
    logger.warn(
      'RoleGuard',
      `User ${user.email} (${user.platformRole}) denied access — requires one of: ${requiredRoles.join(', ')}`,
    );
    // TODO (Auth chunk): return router.createUrlTree(['/forbidden']);
  }

  // Stub: allow access during development regardless
  return true;
};
