import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { PlatformRole } from './core/models/platform-role.enum';

/**
 * Application routes.
 *
 * Structure:
 *  - Login / Register → outside ShellComponent (no header/footer)
 *  - All other routes → inside ShellComponent (with header/footer)
 *  - 404 wildcard → inside shell so it still has navigation
 *
 * All feature components are lazy-loaded via loadComponent for code splitting.
 * Route params are automatically bound to component inputs via withComponentInputBinding().
 */
export const routes: Routes = [
  // ── Auth pages (no shell layout) ─────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Sign In — EventHub',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
    title: 'Create Account — EventHub',
  },

  // ── Shell layout (header + footer) ───────────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      // Public routes
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'EventHub — Discover & Manage Events',
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./features/events/event-list/event-list.component').then(
            (m) => m.EventListComponent,
          ),
        title: 'Events — EventHub',
      },
      {
        path: 'events/:id',
        loadComponent: () =>
          import('./features/events/event-detail/event-detail.component').then(
            (m) => m.EventDetailComponent,
          ),
        title: 'Event Detail — EventHub',
      },

      // Protected — requires authenticated user
      {
        path: 'bookings',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/bookings/bookings.component').then((m) => m.BookingsComponent),
        title: 'My Bookings — EventHub',
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/user/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        title: 'Dashboard — EventHub',
      },

      // Protected — requires Admin or SuperAdmin platform role
      {
        path: 'organizer',
        canActivate: [authGuard, roleGuard],
        data: { roles: [PlatformRole.Admin, PlatformRole.SuperAdmin] },
        loadComponent: () =>
          import('./features/organizer/organizer.component').then((m) => m.OrganizerComponent),
        title: 'Organizer Portal — EventHub',
      },
      {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { roles: [PlatformRole.Admin, PlatformRole.SuperAdmin] },
        loadComponent: () =>
          import('./features/admin/admin.component').then((m) => m.AdminComponent),
        title: 'Admin Panel — EventHub',
      },

      // 404 — inside shell so users still have navigation
      {
        path: '**',
        loadComponent: () =>
          import('./shared/components/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
        title: 'Page Not Found — EventHub',
      },
    ],
  },
];
