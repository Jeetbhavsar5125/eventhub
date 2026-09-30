import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { SidebarNavItem } from './sidebar-nav-item.model';

/**
 * SidebarComponent — reusable dark navigation sidebar.
 *
 * Parent layouts (OrganizerLayout, AdminLayout) control:
 *   - Which nav items to display (navItems input)
 *   - Mobile open/close state (isOpen input)
 *
 * Usage:
 *   <app-sidebar
 *     title="Organizer Portal"
 *     [navItems]="navItems"
 *     [isOpen]="isSidebarOpen()"
 *     (closeRequested)="closeSidebar()"
 *   />
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);

  /** Context label shown below the brand (e.g. "Organizer" or "Admin"). */
  readonly title = input<string>('');

  /** Navigation items to render. */
  readonly navItems = input<SidebarNavItem[]>([]);

  /** Mobile sidebar open state — controlled by the parent layout. */
  readonly isOpen = input(false);

  /** Emitted when the sidebar requests to close (e.g. nav click on mobile). */
  readonly closeRequested = output<void>();

  /** Current user for the bottom user-info area. */
  readonly currentUser = this.authService.currentUser;

  close(): void {
    this.closeRequested.emit();
  }
}
