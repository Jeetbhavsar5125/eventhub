import { Component, input } from '@angular/core';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * BadgeComponent — reusable badge for statuses or small labels.
 *
 * Usage:
 *   <app-badge text="Active" variant="success" />
 */
@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span class="badge badge-{{ variant() }}">
      {{ text() }}
    </span>
  `,
  styles: [
    `
      /* Styles are defined globally in styles.css under BADGES */
      :host {
        display: inline-flex;
      }
    `,
  ],
})
export class BadgeComponent {
  readonly text = input.required<string>();
  readonly variant = input<BadgeVariant>('default');
}
