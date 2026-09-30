import { Component, input } from '@angular/core';

/**
 * PageHeaderComponent — consistent page-level heading area.
 *
 * Usage:
 *   <app-page-header title="My Events" />
 *   <app-page-header title="My Events" subtitle="Manage all your created events." />
 */
@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="pg-hdr">
      <h1 class="pg-hdr-title">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="pg-hdr-sub">{{ subtitle() }}</p>
      }
    </header>
  `,
  styles: [
    `
      .pg-hdr {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-border, #e2e8f0);
      }
      .pg-hdr-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text, #1e293b);
        margin: 0 0 0.25rem;
        letter-spacing: -0.02em;
      }
      .pg-hdr-sub {
        color: var(--color-text-muted, #64748b);
        margin: 0;
        font-size: 1rem;
      }
    `,
  ],
})
export class PageHeaderComponent {
  /** Page title — rendered as an <h1>. Required. */
  readonly title = input.required<string>();
  /** Optional subtitle rendered below the title. */
  readonly subtitle = input<string>('');
}
