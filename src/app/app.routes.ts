import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { guestGuard } from './core/guards/guest.guard';
import { PlatformRole } from './core/models/platform-role.enum';
import { SidebarNavItem } from './layout/core/sidebar/sidebar-nav-item.model';

const ADMIN_NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: 'dashboard', exact: true },
  { label: 'Users', path: '/admin/users', icon: 'users' },
  { label: 'Events', path: '/admin/events', icon: 'calendar' },
  { label: 'Categories', path: '/admin/categories', icon: 'tag' },
];

const ORGANIZER_NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', path: '/organizer', icon: 'dashboard', exact: true },
  { label: 'My Events', path: '/organizer/events', icon: 'calendar' },
  { label: 'Attendees', path: '/organizer/attendees', icon: 'users' },
];

export const routes: Routes = [
  // ── Auth pages (no layout chrome) ─────────────────────────────────────────
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Sign In — EventHub',
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
    title: 'Create Account — EventHub',
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./shared/components/forbidden/forbidden.component').then((m) => m.ForbiddenComponent),
    title: 'Access Denied — EventHub',
  },

  // ── Public Layout ──────────────────────────────────────────────────────────
  {
    path: '',
    data: { layoutType: 'public' },
    loadComponent: () =>
      import('./layout/dynamic-layout/dynamic-layout.component').then((m) => m.DynamicLayoutComponent),
    children: [
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
    ],
  },

  // ── User Layout (Dashboard) ────────────────────────────────────────────────
  {
    path: 'dashboard',
    canActivate: [authGuard],
    data: { layoutType: 'user' },
    loadComponent: () =>
      import('./layout/dynamic-layout/dynamic-layout.component').then((m) => m.DynamicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/user/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        title: 'Dashboard — EventHub',
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./features/bookings/bookings.component').then((m) => m.BookingsComponent),
        title: 'My Bookings — EventHub',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/profile/profile.component').then((m) => m.ProfileComponent),
        title: 'My Profile — EventHub',
      },
    ],
  },

  // ── Organizer Layout ───────────────────────────────────────────────────────
  {
    path: 'organizer',
    canActivate: [authGuard, roleGuard],
    data: { 
      roles: [PlatformRole.Admin, PlatformRole.SuperAdmin],
      layoutType: 'dashboard',
      sidebarTitle: 'Organizer',
      topbarContext: 'Organizer Portal',
      navItems: ORGANIZER_NAV_ITEMS
    },
    loadComponent: () =>
      import('./layout/dynamic-layout/dynamic-layout.component').then((m) => m.DynamicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/organizer/dashboard/organizer-dashboard.component').then(
            (m) => m.OrganizerDashboardComponent,
          ),
        title: 'Organizer Portal — EventHub',
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./features/organizer/events/organizer-events.component').then(
            (m) => m.OrganizerEventsComponent,
          ),
        title: 'Manage Events — EventHub',
      },
      {
        path: 'attendees',
        loadComponent: () =>
          import('./features/organizer/attendees/organizer-attendees.component').then(
            (m) => m.OrganizerAttendeesComponent,
          ),
        title: 'Manage Attendees — EventHub',
      },
    ],
  },

  // ── Admin Layout ───────────────────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { 
      roles: [PlatformRole.Admin, PlatformRole.SuperAdmin],
      layoutType: 'dashboard',
      sidebarTitle: 'Admin',
      topbarContext: 'Admin Panel',
      navItems: ADMIN_NAV_ITEMS
    },
    loadComponent: () =>
      import('./layout/dynamic-layout/dynamic-layout.component').then((m) => m.DynamicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
        title: 'Admin Panel — EventHub',
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/admin-users.component').then(
            (m) => m.AdminUsersComponent,
          ),
        title: 'Manage Users — EventHub',
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./features/admin/events/admin-events.component').then(
            (m) => m.AdminEventsComponent,
          ),
        title: 'Moderate Events — EventHub',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/admin/categories/admin-categories.component').then(
            (m) => m.AdminCategoriesComponent,
          ),
        title: 'Manage Categories — EventHub',
      },
    ],
  },

  // ── 404 Fallback (Must be last) ────────────────────────────────────────────
  {
    path: '**',
    data: { layoutType: 'public' },
    loadComponent: () =>
      import('./layout/dynamic-layout/dynamic-layout.component').then((m) => m.DynamicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./shared/components/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
        title: 'Page Not Found — EventHub',
      }
    ]
  }
];
