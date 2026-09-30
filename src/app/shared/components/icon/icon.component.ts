import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS, IconName } from '../../icons/icons';

/**
 * IconComponent — renders a named SVG icon from the static icon registry.
 *
 * Usage:
 *   <app-icon name="calendar" />
 *   <app-icon name="users" class="my-icon-class" />
 *
 * DomSanitizer.bypassSecurityTrustHtml is safe here because ICONS contains
 * only static, developer-controlled SVG strings — no user input involved.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span class="icon" [innerHTML]="safeHtml()" aria-hidden="true"></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }
      .icon {
        display: inline-flex;
        line-height: 0;
      }
      :host ::ng-deep svg {
        width: 1em;
        height: 1em;
      }
    `,
  ],
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Icon name from the registry. */
  readonly name = input.required<IconName>();

  /** Sanitized SVG HTML ready for [innerHTML] binding. */
  readonly safeHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()]),
  );
}
