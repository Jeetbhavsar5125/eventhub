import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Sign In</h1>
        <p class="auth-sub">Welcome back to EventHub.</p>
        <p class="placeholder-note">
          Login form (email, password, remember-me) will be implemented in the Auth feature chunk.
        </p>
        <p class="auth-footer-text">
          Don't have an account?
          <a routerLink="/register" class="link" id="login-to-register-link">Sign Up</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {}
