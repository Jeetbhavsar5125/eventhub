import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '@core/api/api-client.service';
import { PaginatedResponse } from '@core/api/api.types';
import { EventModel, CreateEventRequest, UpdateEventRequest } from './models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly api = inject(ApiClient);
  private readonly endpoint = '/events';

  /**
   * Get all published events (publicly accessible)
   */
  getEvents(page = 1, limit = 10): Observable<PaginatedResponse<EventModel>> {
    // We can pass AxiosRequestConfig parameters (like query params or abort signals) here
    return this.api.get<PaginatedResponse<EventModel>>(this.endpoint, {
      params: { page, limit }
    });
  }

  /**
   * Get a single event by ID
   */
  getEventById(id: string): Observable<EventModel> {
    return this.api.get<EventModel>(`${this.endpoint}/${id}`);
  }

  /**
   * Create a new event (Requires Organizer/Admin role)
   */
  createEvent(data: CreateEventRequest): Observable<EventModel> {
    return this.api.post<EventModel>(this.endpoint, data);
  }

  /**
   * Update an existing event
   */
  updateEvent(id: string, data: UpdateEventRequest): Observable<EventModel> {
    return this.api.put<EventModel>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Delete an event
   */
  deleteEvent(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
