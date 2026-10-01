export interface EventModel {
  id: string;
  title: string;
  description: string;
  date: string; // ISO String
  location: string;
  category: string;
  status: 'draft' | 'published' | 'cancelled';
  organizerId: string;
  capacity: number;
  ticketsSold: number;
  imageUrl?: string;
}

export type CreateEventRequest = Omit<EventModel, 'id' | 'status' | 'ticketsSold'>;
export type UpdateEventRequest = Partial<CreateEventRequest>;
