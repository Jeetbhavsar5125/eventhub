import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <h1 class="page-title">Platform Admin Dashboard</h1>
    <p class="page-body">System-wide overview and metrics.</p>
    <div class="placeholder-note">
      Chunk 2 Layout Placeholder: Admin dashboard widgets and charts will go here.
    </div>
  `
})
export class AdminDashboardComponent {}
