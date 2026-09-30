import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-container">
      <h1 class="page-title">Welcome to EventHub</h1>
      <p class="page-body">Your central platform for discovering, creating, and managing events.</p>
      <div class="placeholder-actions">
        <a routerLink="/events" class="btn btn-primary" id="home-browse-events-btn">Browse Events</a>
        <a routerLink="/register" class="btn btn-outline" id="home-get-started-btn">Get Started</a>
      </div>
      <p class="placeholder-note">Full landing page design will be implemented when the Stitch design is applied.</p>
    </section>
  `,
})
export class HomeComponent {}
