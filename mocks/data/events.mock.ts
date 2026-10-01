import { EventModel } from '../../src/app/features/events/models/event.model';

export const MOCK_EVENTS: EventModel[] = [
  {
    id: 'evt-101',
    title: 'Global Tech Summit 2026',
    description: 'Join industry leaders for the biggest tech conference of the year.',
    date: '2026-11-15T09:00:00Z',
    location: 'San Francisco, CA',
    category: 'Technology',
    status: 'published',
    organizerId: 'org-1',
    capacity: 5000,
    ticketsSold: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 'evt-102',
    title: 'Design Systems Masterclass',
    description: 'Learn how to build scalable design systems from the creators of Stitch.',
    date: '2026-10-20T14:00:00Z',
    location: 'London, UK',
    category: 'Design',
    status: 'published',
    organizerId: 'org-2',
    capacity: 200,
    ticketsSold: 195,
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
  },
  {
    id: 'evt-103',
    title: 'Startup Pitch Night',
    description: 'Watch 10 promising startups pitch their ideas to top venture capitalists.',
    date: '2026-12-05T18:30:00Z',
    location: 'New York, NY',
    category: 'Business',
    status: 'published',
    organizerId: 'org-1',
    capacity: 500,
    ticketsSold: 150,
  }
];
