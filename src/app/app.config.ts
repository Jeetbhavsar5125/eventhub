import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';

export function initializeApp() {
  const authService = inject(AuthService);
  // Returns an observable, Angular will wait for it to complete before bootstrapping
  return () => authService.initializeSession();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true
    },
    provideRouter(
      routes,
      // Automatically bind route params/query params to component @Input() / input() signals
      withComponentInputBinding(),
      // Child routes inherit parent route params (useful for nested event routes)
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
  ],
};
