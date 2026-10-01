import { setupWorker } from 'msw/browser';
import { eventsHandlers } from './handlers/events.handlers';
import { authHandlers } from './handlers/auth.handlers';

export const worker = setupWorker(
  ...eventsHandlers,
  ...authHandlers
);
