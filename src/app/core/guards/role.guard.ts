import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlatformRole } from '../models/platform-role.enum';

/**
 * RoleGuard — protects routes that require a specific platform-level role.
 * 
 * Usage in routes:
 *   data: { roles: [PlatformRole.Admin] }
 */
export const roleGuard: CanActivateFn = (route): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as PlatformRole[] | undefined;

  // No roles specified — guard passes
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // User must be authenticated to check roles
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  // Check if user holds at least one of the required roles or is SuperAdmin
  const hasRole = requiredRoles.some((role) => authService.hasPlatformRoleOrAbove(role));

  if (!hasRole) {
    // Authenticated but forbidden
    return router.createUrlTree(['/forbidden']);
  }

  return true;
};
