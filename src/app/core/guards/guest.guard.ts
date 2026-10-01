import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * GuestGuard — protects routes that should ONLY be accessed by unauthenticated users.
 * (e.g. /login, /register)
 */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // If already logged in, redirect away from guest routes
  return router.createUrlTree(['/dashboard']);
};
