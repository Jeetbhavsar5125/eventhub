import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="page-container">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-body">Your personal EventHub overview — upcoming events, bookings, and activity.</p>
      <p class="placeholder-note">
        User dashboard with stats, upcoming events, and quick actions will be implemented in the
        User feature chunk. This route is protected by <code>authGuard</code>.
      </p>
    </div>
  `,
})
export class DashboardComponent {}
