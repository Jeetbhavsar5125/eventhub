import { Component, input } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  template: `
    <div class="page-container">
      <h1 class="page-title">Event Detail</h1>
      @if (id()) {
        <p class="page-body">Viewing event: <strong>{{ id() }}</strong></p>
      }
      <p class="placeholder-note">
        Full event detail — description, schedule, tickets, and booking — will be implemented in
        the Events feature chunk. The route param is automatically bound via
        <code>withComponentInputBinding()</code>.
      </p>
    </div>
  `,
})
export class EventDetailComponent {
  /** Automatically bound from the :id route param via withComponentInputBinding(). */
  readonly id = input<string>('');
}
