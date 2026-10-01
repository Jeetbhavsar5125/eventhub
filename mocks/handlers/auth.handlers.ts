import { http, HttpResponse, delay } from 'msw';
import { AuthResponse, LoginRequest, RegisterRequest, RefreshResponse } from '../../src/app/core/models/auth.types';
import { User } from '../../src/app/core/models/user.model';
import { PlatformRole } from '../../src/app/core/models/platform-role.enum';

const BASE_URL = '/api/v1/auth';

// --- MOCK USERS ---
const MOCK_ADMIN: User = {
  id: 'usr-admin-1',
  email: 'admin@eventhub.local',
  displayName: 'System Admin',
  platformRole: PlatformRole.Admin,
  eventRoles: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MOCK_USER: User = {
  id: 'usr-1',
  email: 'user@eventhub.local',
  displayName: 'Regular User',
  platformRole: PlatformRole.User,
  eventRoles: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Store session state purely in memory for the mock
let currentSessionUser: User | null = null;
let currentAccessToken: string | null = null;

export const authHandlers = [
  // POST /login
  http.post(`${BASE_URL}/login`, async ({ request }) => {
    await delay(800); // Simulate network latency
    const body = (await request.json()) as LoginRequest;

    if (body.email === 'admin@eventhub.local' && body.password === 'password') {
      currentSessionUser = MOCK_ADMIN;
    } else if (body.email === 'user@eventhub.local' && body.password === 'password') {
      currentSessionUser = MOCK_USER;
    } else {
      return HttpResponse.json({ statusCode: 401, message: 'Invalid email or password.' }, { status: 401 });
    }

    currentAccessToken = `mock-access-token-${Date.now()}`;
    const response: AuthResponse = {
      accessToken: currentAccessToken,
      refreshToken: 'mock-refresh-token',
      user: currentSessionUser,
    };

    return HttpResponse.json(response);
  }),

  // POST /register
  http.post(`${BASE_URL}/register`, async ({ request }) => {
    await delay(1000);
    const body = (await request.json()) as RegisterRequest;

    if (body.email === 'admin@eventhub.local' || body.email === 'user@eventhub.local') {
      return HttpResponse.json({ statusCode: 409, message: 'An account with this email already exists.' }, { status: 409 });
    }

    currentSessionUser = {
      id: `usr-${Date.now()}`,
      email: body.email,
      displayName: `${body.firstName} ${body.lastName}`,
      platformRole: PlatformRole.User,
      eventRoles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    currentAccessToken = `mock-access-token-${Date.now()}`;

    const response: AuthResponse = {
      accessToken: currentAccessToken,
      refreshToken: 'mock-refresh-token',
      user: currentSessionUser,
    };
    return HttpResponse.json(response, { status: 201 });
  }),

  // GET /me
  http.get(`${BASE_URL}/me`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    // Check if missing or invalid token
    if (!authHeader || !authHeader.startsWith('Bearer mock-access-token')) {
      return HttpResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    if (!currentSessionUser) {
      return HttpResponse.json({ statusCode: 401, message: 'Session expired' }, { status: 401 });
    }

    return HttpResponse.json(currentSessionUser);
  }),

  // POST /refresh
  http.post(`${BASE_URL}/refresh`, async () => {
    await delay(500);
    // Simulate a successful refresh
    currentAccessToken = `mock-refreshed-token-${Date.now()}`;
    
    const response: RefreshResponse = {
      accessToken: currentAccessToken,
    };
    return HttpResponse.json(response);
  }),

  // POST /logout
  http.post(`${BASE_URL}/logout`, async () => {
    await delay(400);
    currentSessionUser = null;
    currentAccessToken = null;
    return HttpResponse.json({ success: true });
  })
];
