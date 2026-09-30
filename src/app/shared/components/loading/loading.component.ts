import { Component, input } from '@angular/core';

/**
 * LoadingComponent — reusable loading indicator.
 *
 * Usage:
 *   <app-loading />
 *   <app-loading message="Fetching events..." />
 */
@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="loading-wrap" role="status" [attr.aria-label]="message() || 'Loading...'">
      <span class="loading-spinner" aria-hidden="true"></span>
      @if (message()) {
        <span class="loading-text">{{ message() }}</span>
      }
    </div>
  `,
  styles: [
    `
      .loading-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 2rem;
      }
      .loading-spinner {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid var(--color-border, #e2e8f0);
        border-top-color: var(--color-primary, #2563eb);
        border-radius: 50%;
        animation: eh-spin 0.65s linear infinite;
        flex-shrink: 0;
      }
      @keyframes eh-spin {
        to {
          transform: rotate(360deg);
        }
      }
      .loading-text {
        font-size: 0.875rem;
        color: var(--color-text-muted, #64748b);
      }
    `,
  ],
})
export class LoadingComponent {
  /** Optional status message displayed beside the spinner. */
  readonly message = input<string>('');
}
