import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  template: `
    <h1 class="page-title">User Management</h1>
    <p class="page-body">Manage platform users and roles.</p>
    <div class="placeholder-note">
      Chunk 2 Layout Placeholder: User listing, search, and role assignment will go here.
    </div>
  `
})
export class AdminUsersComponent {}
