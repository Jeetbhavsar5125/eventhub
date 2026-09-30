import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <h1 class="page-title">My Profile</h1>
    <p class="page-body">Manage your personal details and preferences.</p>
    <div class="placeholder-note">
      Chunk 2 Layout Placeholder: User Profile logic and forms will go here.
    </div>
  `
})
export class ProfileComponent {}
