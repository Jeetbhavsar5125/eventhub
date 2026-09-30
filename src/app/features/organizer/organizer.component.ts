import { Component } from '@angular/core';

@Component({
  selector: 'app-organizer',
  standalone: true,
  template: `
    <div class="page-container">
      <h1 class="page-title">Organizer Portal</h1>
      <p class="page-body">Create and manage your events, assign team roles, and track performance.</p>
      <p class="placeholder-note">
        Organizer dashboard — event creation wizard, team role management, analytics, and attendee
        management — will be implemented in the Organizer feature chunk. This route is protected by
        <code>authGuard</code> + <code>roleGuard</code>.
      </p>
    </div>
  `,
})
export class OrganizerComponent {}
