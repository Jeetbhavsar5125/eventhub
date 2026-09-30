# EventHub

A production-oriented **Event Management System** built with **Angular 21 + TypeScript**.

> **Chunk 1 — Foundation & Project Architecture** is complete.
> Future chunks will build features on top of this foundation.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:4200

# Run unit tests
npm test

# Production build
npm run build
```

---

## Project Architecture

```
src/app/
├── core/                        # Singleton services, guards, models, interceptors
│   ├── auth/                    # Auth infrastructure (token, session — future chunk)
│   ├── guards/
│   │   ├── auth.guard.ts        # Protects authenticated routes
│   │   └── role.guard.ts        # Protects role-restricted routes (reads route data.roles)
│   ├── interceptors/            # HTTP interceptors (future chunk)
│   ├── models/
│   │   ├── platform-role.enum.ts   # SuperAdmin | Admin | User
│   │   ├── event-role.enum.ts      # Organizer | EventManager | Staff | ...
│   │   ├── user.model.ts           # User + EventRoleAssignment (per-event roles)
│   │   ├── permission.model.ts     # Permission type + RolePermissions
│   │   ├── auth-state.model.ts     # AuthState signal shape
│   │   └── index.ts                # Barrel export
│   └── services/
│       ├── auth.service.ts      # Signal-based auth state, RBAC helpers (stub)
│       └── logger.service.ts    # Dev/prod-aware contextual logger
│
├── shared/                      # Reusable components, directives, pipes, models
│   ├── components/
│   │   ├── loading/             # <app-loading message="..." />
│   │   ├── error-message/       # <app-error-message message="..." />
│   │   ├── page-header/         # <app-page-header title="..." subtitle="..." />
│   │   └── not-found/           # 404 page (wildcard route)
│   ├── directives/              # (future chunk)
│   ├── pipes/                   # (future chunk)
│   └── models/
│       └── api-response.model.ts   # ApiResponse<T>, PaginatedResponse<T>, ApiError
│
├── features/                    # Lazy-loaded feature areas
│   ├── home/                    # Landing page
│   ├── auth/                    # login/ · register/
│   ├── events/                  # event-list/ · event-detail/
│   ├── bookings/                # My bookings
│   ├── user/                    # dashboard/
│   ├── organizer/               # Organizer portal
│   └── admin/                   # Admin panel
│
├── layout/                      # Application shell
│   ├── header/                  # Sticky nav + auth actions + mobile toggle
│   ├── footer/                  # Copyright + links
│   └── shell/                   # Composes header + <router-outlet> + footer
│
└── app.routes.ts                # All routes with lazy loading + guards
```

---

## Routing

| Path | Component | Access |
|---|---|---|
| `/` | `HomeComponent` | Public |
| `/events` | `EventListComponent` | Public |
| `/events/:id` | `EventDetailComponent` | Public |
| `/login` | `LoginComponent` | Public (no shell) |
| `/register` | `RegisterComponent` | Public (no shell) |
| `/bookings` | `BookingsComponent` | `authGuard` |
| `/dashboard` | `DashboardComponent` | `authGuard` |
| `/organizer` | `OrganizerComponent` | `authGuard` + `roleGuard` (Admin+) |
| `/admin` | `AdminComponent` | `authGuard` + `roleGuard` (Admin+) |
| `**` | `NotFoundComponent` | Public |

---

## RBAC

### Platform roles (system-wide)
```
SuperAdmin  →  full platform access
Admin       →  organizer + admin panels
User        →  standard authenticated access
Guest       →  unauthenticated visitor (not a persisted role)
```

### Event roles (per-event)
```
Organizer | EventManager | Staff | Volunteer | Speaker | Sponsor | Attendee
```

A user holds **one platform role** but can have **different event roles across different events**:

```
user.eventRoles = [
  { eventId: 'evt-001', role: EventRole.Organizer },
  { eventId: 'evt-002', role: EventRole.Speaker },
  { eventId: 'evt-003', role: EventRole.Volunteer },
]
```

### Permission flow (foundation ready)
```
Role  →  Permission  →  Guard / UI Auth  →  Feature Access
```

---

## TypeScript Path Aliases

```typescript
// Instead of deep relative imports:
import { User } from '../../../core/models/user.model';

// Use aliases (configured in tsconfig.json):
import { User } from '@core/models/user.model';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { HomeComponent } from '@features/home/home.component';
import { ShellComponent } from '@layout/shell/shell.component';
```

---

## Development Chunks

| Chunk | Status | Description |
|---|---|---|
| **1 — Foundation** | ✅ Complete | Architecture, routing, RBAC models, layout shell |
| 2 — Auth | Planned | Login, register, token management, session |
| 3 — Events | Planned | Event listing, detail, search, filters |
| 4 — Bookings | Planned | Ticket booking, QR codes, cancellation |
| 5 — Organizer | Planned | Event creation, team roles, analytics |
| 6 — Admin | Planned | User management, platform settings |
| 7 — UI/UX | Planned | Stitch design implementation |

---

## Tech Stack

| | |
|---|---|
| Framework | Angular 21 (standalone components, no NgModules) |
| Language | TypeScript 5.9 (strict mode) |
| State | Angular Signals |
| Routing | Angular Router with lazy loading |
| Styling | Vanilla CSS + CSS custom properties |
| Testing | Vitest |
| Fonts | Inter (Google Fonts) |
