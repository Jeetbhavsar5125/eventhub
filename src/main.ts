import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';

async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import('../mocks/browser');
    // Start MSW but bypass unhandled requests so normal assets still load
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
});
