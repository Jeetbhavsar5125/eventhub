import { PlatformRole } from './platform-role.enum';
import { EventRole } from './event-role.enum';

/**
 * Represents a user's role assignment for a specific event.
 * A single user can have different roles for different events.
 */
export interface EventRoleAssignment {
  eventId: string;
  role: EventRole;
}

/**
 * Core user model representing any authenticated person in the system.
 *
 * RBAC structure:
 *   - platformRole: single system-wide role (User / Admin / SuperAdmin)
 *   - eventRoles:   per-event role assignments (Organizer, Speaker, Attendee, etc.)
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  platformRole: PlatformRole;
  eventRoles: EventRoleAssignment[];
  createdAt: Date;
  updatedAt: Date;
}
