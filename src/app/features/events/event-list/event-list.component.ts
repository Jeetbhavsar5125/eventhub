import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, BadgeComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">Events</h1>
      <p class="page-body">Browse and discover upcoming events near you.</p>
      
      @if (events$ | async; as response) {
        <div class="events-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-6); margin-top: var(--space-8);">
          @for (event of response.items; track event.id) {
            <div class="event-card" style="border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; background: var(--color-surface);">
              @if (event.imageUrl) {
                <img [src]="event.imageUrl" [alt]="event.title" style="width: 100%; height: 200px; object-fit: cover;">
              } @else {
                <div style="width: 100%; height: 200px; background: var(--color-bg); display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary);">
                  No Image
                </div>
              }
              <div style="padding: var(--space-4);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-2);">
                  <app-badge [text]="event.category" variant="primary" />
                  <span style="color: var(--color-text-secondary); font-size: var(--text-sm);">{{ event.date | date:'mediumDate' }}</span>
                </div>
                <h3 style="margin-bottom: var(--space-2); font-size: var(--text-lg); font-weight: var(--font-semibold);">{{ event.title }}</h3>
                <p style="color: var(--color-text-secondary); font-size: var(--text-sm);">{{ event.location }}</p>
                <p style="color: var(--color-text-secondary); font-size: var(--text-sm); margin-top: var(--space-2);">Capacity: {{ event.capacity }}</p>
              </div>
            </div>
          }
        </div>
      } @else {
        <app-empty-state 
          icon="calendar" 
          title="Loading Events..." 
          description="Please wait while we fetch the latest events from the API." 
        />
      }
    </div>
  `,
})
export class EventListComponent {
  private readonly eventService = inject(EventService);
  
  // Directly bind the Observable to the template using the async pipe.
  // This demonstrates Component -> Service -> ApiClient -> Axios -> MSW
  readonly events$ = this.eventService.getEvents();
}
