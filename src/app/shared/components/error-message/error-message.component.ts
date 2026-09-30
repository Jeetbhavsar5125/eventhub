import { Component, input } from '@angular/core';

/**
 * ErrorMessageComponent — reusable inline error alert.
 *
 * Usage:
 *   <app-error-message message="Something went wrong. Please try again." />
 */
@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    <div class="error-msg" role="alert">
      <svg
        class="error-icon"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="error-text">{{ message() }}</p>
    </div>
  `,
  styles: [
    `
      .error-msg {
        display: flex;
        align-items: flex-start;
        gap: 0.625rem;
        padding: 0.75rem 1rem;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: var(--radius, 0.375rem);
        color: #dc2626;
      }
      .error-icon {
        width: 1.125rem;
        height: 1.125rem;
        flex-shrink: 0;
        margin-top: 0.0625rem;
      }
      .error-text {
        font-size: 0.875rem;
        margin: 0;
        line-height: 1.5;
      }
    `,
  ],
})
export class ErrorMessageComponent {
  /** The error message to display. Required. */
  readonly message = input.required<string>();
}
