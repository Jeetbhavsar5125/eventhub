import { http, HttpResponse } from 'msw';
import { MOCK_EVENTS } from '../data/events.mock';
import { PaginatedResponse } from '../../src/app/core/api/api.types';
import { EventModel } from '../../src/app/features/events/models/event.model';

const BASE_URL = '/api/v1';

export const eventsHandlers = [
  // GET /api/v1/events
  http.get(`${BASE_URL}/events`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    
    // Simple pagination mock
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = MOCK_EVENTS.slice(startIndex, endIndex);

    const response: PaginatedResponse<EventModel> = {
      items: paginatedItems,
      totalCount: MOCK_EVENTS.length,
      page,
      limit,
    };

    return HttpResponse.json(response);
  }),

  // GET /api/v1/events/:id
  http.get(`${BASE_URL}/events/:id`, ({ params }) => {
    const { id } = params;
    const event = MOCK_EVENTS.find((e) => e.id === id);

    if (!event) {
      return HttpResponse.json(
        { statusCode: 404, message: 'Event not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(event);
  }),
];
