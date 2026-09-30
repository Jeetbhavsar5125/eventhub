import { Injectable, isDevMode } from '@angular/core';

/** Log levels supported by LoggerService. */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * LoggerService — centralised logging wrapper.
 *
 * - In development: outputs all levels to the browser console.
 * - In production: suppresses debug/info; warns/errors can be wired to a
 *   remote logging service (e.g. Sentry, Datadog) in a future chunk.
 *
 * Usage:
 *   private logger = inject(LoggerService);
 *   this.logger.info('UserService', 'User loaded', user);
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly isDev = isDevMode();

  debug(context: string, message: string, ...args: unknown[]): void {
    if (this.isDev) {
      console.debug(`[DEBUG] [${context}] ${message}`, ...args);
    }
  }

  info(context: string, message: string, ...args: unknown[]): void {
    if (this.isDev) {
      console.info(`[INFO]  [${context}] ${message}`, ...args);
    }
  }

  warn(context: string, message: string, ...args: unknown[]): void {
    console.warn(`[WARN]  [${context}] ${message}`, ...args);
  }

  error(context: string, message: string, ...args: unknown[]): void {
    console.error(`[ERROR] [${context}] ${message}`, ...args);
    // TODO (logging chunk): forward to remote error tracking service
  }
}
