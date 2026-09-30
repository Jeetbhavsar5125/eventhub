import { Component, input } from '@angular/core';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * ContainerComponent — consistent max-width container wrapper.
 *
 * Usage:
 *   <app-container size="lg">
 *     Content goes here
 *   </app-container>
 */
@Component({
  selector: 'app-container',
  standalone: true,
  template: `
    <div class="container container-{{ size() === 'full' ? 'fluid' : size() }}">
      <ng-content />
    </div>
  `,
  styles: [
    `
      /* Container utility classes are in styles.css */
      :host {
        display: block;
        width: 100%;
      }
      .container-fluid {
        max-width: none;
      }
    `,
  ],
})
export class ContainerComponent {
  /** The max-width breakpoint constraint. Default is 'xl' (1200px). */
  readonly size = input<ContainerSize>('xl');
}
