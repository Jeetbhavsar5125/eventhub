import { Component, input } from '@angular/core';

/**
 * FormFieldComponent — wrapper for form inputs to handle labels, errors, and hints consistently.
 *
 * Usage:
 *   <app-form-field label="Email Address" fieldId="email" [error]="emailError" hint="We'll never share your email.">
 *     <input type="email" id="email" class="form-control" />
 *   </app-form-field>
 */
@Component({
  selector: 'app-form-field',
  standalone: true,
  template: `
    <div class="form-group">
      @if (label()) {
        <label [for]="fieldId()" class="form-label" [class.form-required]="required()">
          {{ label() }}
        </label>
      }
      
      <!-- The actual input element (e.g. <input>, <select>) is projected here -->
      <ng-content />

      @if (error()) {
        <div class="form-error-text" role="alert">{{ error() }}</div>
      } @else if (hint()) {
        <div class="form-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styles: [
    `
      /* form-group, form-label, form-required, form-error-text, form-hint styles are global in styles.css */
      :host {
        display: block;
      }
    `,
  ],
})
export class FormFieldComponent {
  /** The text label for the field. */
  readonly label = input<string>();
  /** The HTML id of the projected input, used for the label's 'for' attribute. */
  readonly fieldId = input<string>();
  /** Error message to display. If truthy, the hint is hidden. */
  readonly error = input<string | null | undefined>();
  /** Helper text displayed below the field. */
  readonly hint = input<string>();
  /** If true, adds a required indicator (*) to the label. */
  readonly required = input(false);
}
