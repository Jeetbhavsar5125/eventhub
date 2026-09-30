import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-page">
      <div class="not-found-content">
        <p class="not-found-code">404</p>
        <h1 class="not-found-title">Page Not Found</h1>
        <p class="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a routerLink="/" class="btn btn-primary" id="not-found-home-btn">Back to Home</a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
