import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="page-container">
      <h1 class="page-title">Admin Panel</h1>
      <p class="page-body">Platform administration — users, events, and system configuration.</p>
      <p class="placeholder-note">
        Admin panel — user management, platform settings, content moderation — will be implemented
        in the Admin feature chunk. This route is protected by <code>authGuard</code> +
        <code>roleGuard</code> (Admin / SuperAdmin only).
      </p>
    </div>
  `,
})
export class AdminComponent {}
