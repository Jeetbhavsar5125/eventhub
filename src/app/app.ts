import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component.
 * Renders only a <router-outlet> — all layout (header/footer) is handled
 * by the ShellComponent, which is loaded as the parent route for most pages.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {}
