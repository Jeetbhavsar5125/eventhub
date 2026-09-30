import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Automatically bind route params/query params to component @Input() / input() signals
      withComponentInputBinding(),
      // Child routes inherit parent route params (useful for nested event routes)
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
  ],
};
