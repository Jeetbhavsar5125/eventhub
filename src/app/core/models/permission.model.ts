import { PlatformRole } from './platform-role.enum';
import { EventRole } from './event-role.enum';

export type Permission =
  | 'events:read'
  | 'events:create'
  | 'events:update'
  | 'events:delete'
  | 'bookings:read'
  | 'bookings:create'
  | 'bookings:cancel'
  | 'users:read'
  | 'users:manage'
  | 'admin:access'
  | 'organizer:access';


export interface RolePermissions {
  platformRole?: PlatformRole;
  eventRole?: EventRole;
  permissions: Permission[];
}
