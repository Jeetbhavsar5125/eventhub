import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [EmptyStateComponent, RouterLink],
  template: `
    <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-4);">
      <app-empty-state 
        icon="alert-circle" 
        title="Access Denied" 
        description="You do not have permission to view this page." 
      />
      <a routerLink="/" style="margin-top: var(--space-6); color: var(--color-primary); font-weight: var(--font-medium); text-decoration: none;">
        Return to Home
      </a>
    </div>
  `
})
export class ForbiddenComponent {}
