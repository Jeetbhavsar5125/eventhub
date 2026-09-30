import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  standalone: true,
  template: `
    <div class="page-container">
      <h1 class="page-title">Events</h1>
      <p class="page-body">Browse and discover upcoming events near you.</p>
      <p class="placeholder-note">
        Event listing with search, filters, and category browsing will be implemented in the Events
        feature chunk.
      </p>
    </div>
  `,
})
export class EventListComponent {}
