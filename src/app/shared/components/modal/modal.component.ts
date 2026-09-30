import { Component, input, output, ElementRef, inject, HostListener } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

/**
 * ModalComponent — reusable dialog window.
 *
 * Usage:
 *   <app-modal [isOpen]="isModalOpen()" title="Confirm Action" (close)="isModalOpen.set(false)">
 *     <p>Are you sure?</p>
 *     <div modal-footer>
 *       <button class="btn btn-ghost" (click)="isModalOpen.set(false)">Cancel</button>
 *       <button class="btn btn-primary">Confirm</button>
 *     </div>
 *   </app-modal>
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IconComponent],
  template: `
    @if (isOpen()) {
      <div class="modal-backdrop" (click)="onBackdropClick($event)">
        <div class="modal-panel" role="dialog" aria-modal="true" [attr.aria-labelledby]="title() ? 'modal-title' : null">
          
          <div class="modal-header">
            @if (title()) {
              <h2 id="modal-title" class="modal-title">{{ title() }}</h2>
            }
            <button class="modal-close" type="button" (click)="close.emit()" aria-label="Close modal">
              <app-icon name="x" />
            </button>
          </div>

          <div class="modal-body">
            <ng-content />
          </div>

          <!-- Optional footer via content projection -->
          @if (hasFooter) {
            <div class="modal-footer">
              <ng-content select="[modal-footer]" />
            </div>
          }
          
        </div>
      </div>
    }
  `,
  styles: [
    `
      /* Modal styles are global in styles.css to ensure z-index context is correct */
      :host {
        display: block;
      }
    `,
  ],
})
export class ModalComponent {
  private readonly elementRef = inject(ElementRef);

  readonly isOpen = input.required<boolean>();
  readonly title = input<string>();
  readonly closeOnBackdrop = input(true);
  
  readonly close = output<void>();

  // Check if a footer was provided
  get hasFooter(): boolean {
    return !!this.elementRef.nativeElement.querySelector('[modal-footer]');
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop() && (event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.close.emit();
    }
  }
}
