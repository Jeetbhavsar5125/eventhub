import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  /** Controls mobile nav open/closed state. */
  readonly isNavOpen = signal(false);

  /** Exposed auth signals for template use. */
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;

  toggleNav(): void {
    this.isNavOpen.update((open) => !open);
  }

  logout(): void {
    this.authService.logout();
    this.isNavOpen.set(false);
  }
}
