import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * ShellComponent — main application layout wrapper.
 *
 * Renders: Header → <router-outlet> (feature pages) → Footer
 *
 * Used as the parent route for all authenticated and public pages.
 * Auth pages (login, register) are routed outside the shell so they
 * render without the header/footer chrome.
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {}
