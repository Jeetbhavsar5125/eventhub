# EventHub API Documentation

## Base URL
`/api/v1`

## Common Headers
- `Authorization: Bearer <token>` (Required for protected endpoints)
- `Content-Type: application/json`

## Common Responses
- `200 OK`: Request succeeded
- `201 Created`: Resource created
- `400 Bad Request`: Validation error or invalid request
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions (Role check failed)
- `404 Not Found`: Resource does not exist
- `500 Server Error`: Internal backend error

---

## 1. Authentication (Public)
### Login
- **Endpoint**: `POST /auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ accessToken, refreshToken, user: { id, email, role, ... } }`

### Register
- **Endpoint**: `POST /auth/register`
- **Body**: `{ email, password, firstName, lastName }`
- **Response**: `{ accessToken, refreshToken, user: { ... } }`

---

## 2. Events
### Get All Events
- **Endpoint**: `GET /events`
- **Query Params**: `?page=1&limit=10&status=published&category=tech`
- **Auth**: Optional (Public gets published only, Admin gets all)
- **Response**: `{ items: Event[], totalCount: number, page: 1, limit: 10 }`

### Get Event By ID
- **Endpoint**: `GET /events/:id`
- **Response**: `Event`

### Create Event
- **Endpoint**: `POST /events`
- **Auth**: Required (Organizer/Admin)
- **Body**: `CreateEventRequest`
- **Response**: `Event` (201 Created)

### Update Event
- **Endpoint**: `PUT /events/:id`
- **Auth**: Required (Owner Organizer/Admin)
- **Body**: `UpdateEventRequest`
- **Response**: `Event`

### Delete Event
- **Endpoint**: `DELETE /events/:id`
- **Auth**: Required (Owner Organizer/Admin)
- **Response**: `204 No Content`

---

## 3. Bookings
### Get My Bookings
- **Endpoint**: `GET /bookings/my`
- **Auth**: Required (User)
- **Response**: `{ items: Booking[] }`

### Create Booking
- **Endpoint**: `POST /bookings`
- **Auth**: Required (User)
- **Body**: `{ eventId, ticketQuantity, ... }`
- **Response**: `Booking` (201 Created)

---

## 4. Users (Admin Only)
### Get Users
- **Endpoint**: `GET /users`
- **Auth**: Required (Admin/SuperAdmin)
- **Query Params**: `?page=1&limit=20&role=organizer`
- **Response**: `{ items: User[], totalCount, page, limit }`
