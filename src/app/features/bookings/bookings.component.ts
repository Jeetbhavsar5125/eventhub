import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  template: `
    <div class="page-container">
      <h1 class="page-title">My Bookings</h1>
      <p class="page-body">View and manage all your event bookings in one place.</p>
      <p class="placeholder-note">
        Booking list, ticket details, QR codes, and cancellation will be implemented in the
        Bookings feature chunk. This route is protected by <code>authGuard</code>.
      </p>
    </div>
  `,
})
export class BookingsComponent {}
