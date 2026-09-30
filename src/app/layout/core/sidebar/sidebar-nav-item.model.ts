import { IconName } from '@shared/icons/icons';

/**
 * Represents a single navigation item in the sidebar.
 * Used by SidebarComponent to render nav links with icons and active states.
 */
export interface SidebarNavItem {
  /** Display label. */
  label: string;
  /** Absolute route path (e.g. '/organizer/events'). */
  path: string;
  /** Icon name from the shared icon registry. */
  icon: IconName;
  /** If true, RouterLinkActive uses exact matching for the path. */
  exact?: boolean;
}
