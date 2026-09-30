import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

/**
 * AuthGuard — protects routes that require an authenticated user.
 *
 * Usage in routes:
 *   { path: 'bookings', canActivate: [authGuard], loadComponent: () => ... }
 *
 * NOTE (Chunk 1): Returns `true` as a stub while the auth system is not yet
 * implemented. In the Auth feature chunk this will redirect unauthenticated
 * users to /login with a `returnUrl` query param.
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  if (authService.isAuthenticated()) {
    return true;
  }

  logger.debug('AuthGuard', `Unauthenticated access attempt to: ${state.url}`);

  // TODO (Auth chunk): uncomment redirect once login flow is implemented
  // return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });

  // Stub: allow access during development
  return true;
};
