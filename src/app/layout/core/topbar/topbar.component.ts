import { Component, inject, input, output } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IconComponent } from '@shared/components/icon/icon.component';

/**
 * TopbarComponent — sticky horizontal bar for sidebar-based layouts.
 *
 * Shows:
 *   - Hamburger button to toggle sidebar (emits menuToggled)
 *   - Context label (e.g. "Organizer Portal")
 *   - Current user avatar + name
 *   - Logout button
 *
 * Used by OrganizerLayout and AdminLayout.
 */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  private readonly authService = inject(AuthService);

  /** Label shown next to the menu icon (e.g. "Organizer Portal"). */
  readonly context = input<string>('');

  /** Emitted when the hamburger button is clicked — parent toggles sidebar. */
  readonly menuToggled = output<void>();

  readonly currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
  }
}
