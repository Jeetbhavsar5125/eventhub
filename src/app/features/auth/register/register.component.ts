import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-sub">Join EventHub and start exploring events.</p>
        <p class="placeholder-note">
          Registration form (name, email, password) will be implemented in the Auth feature chunk.
        </p>
        <p class="auth-footer-text">
          Already have an account?
          <a routerLink="/login" class="link" id="register-to-login-link">Sign In</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {}
