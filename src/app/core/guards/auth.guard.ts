import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard — protects routes that require an authenticated user.
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect unauthenticated users to /login with a `returnUrl` query param
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
