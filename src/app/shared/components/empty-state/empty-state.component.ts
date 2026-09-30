import { Component, input, output } from '@angular/core';
import { IconName } from '../../icons/icons';
import { IconComponent } from '../icon/icon.component';

/**
 * EmptyStateComponent — generic placeholder for empty lists or missing data.
 *
 * Usage:
 *   <app-empty-state
 *     icon="inbox"
 *     title="No Events Found"
 *     description="You haven't created any events yet."
 *     actionLabel="Create Event"
 *     (actionClick)="openCreateModal()"
 *   />
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="empty-state">
      @if (icon()) {
        <div class="empty-state-icon" aria-hidden="true">
          <app-icon [name]="icon()!" />
        </div>
      }
      <h3 class="empty-state-title">{{ title() }}</h3>
      @if (description()) {
        <p class="empty-state-description">{{ description() }}</p>
      }
      @if (actionLabel()) {
        <button type="button" class="btn btn-primary btn-sm empty-state-action" (click)="actionClick.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--space-12) var(--space-4);
        background-color: var(--color-surface);
        border: 1px dashed var(--color-border-strong);
        border-radius: var(--radius-xl);
      }
      .empty-state-icon {
        font-size: 3rem;
        color: var(--color-border-strong);
        margin-bottom: var(--space-4);
      }
      .empty-state-title {
        font-size: var(--text-lg);
        font-weight: var(--font-semibold);
        color: var(--color-text);
        margin-bottom: var(--space-2);
      }
      .empty-state-description {
        font-size: var(--text-sm);
        color: var(--color-text-secondary);
        max-width: 400px;
        margin-bottom: var(--space-6);
      }
      .empty-state-action {
        min-width: 120px;
      }
    `,
  ],
})
export class EmptyStateComponent {
  readonly icon = input<IconName>();
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly actionLabel = input<string>();
  readonly actionClick = output<void>();
}
