import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormFieldComponent],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Sign In</h1>
        <p class="auth-sub">Welcome back to EventHub.</p>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <app-form-field label="Email Address">
            <input 
              type="email" 
              formControlName="email" 
              class="input-control" 
              placeholder="name@company.com" 
              autocomplete="email"
            />
          </app-form-field>

          <app-form-field label="Password">
            <input 
              type="password" 
              formControlName="password" 
              class="input-control" 
              placeholder="••••••••" 
              autocomplete="current-password"
            />
          </app-form-field>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm);">
              <input type="checkbox" formControlName="rememberMe"> Remember me
            </label>
            <a href="#" style="font-size: var(--text-sm); color: var(--color-primary); text-decoration: none;">Forgot password?</a>
          </div>

          @if (errorMessage()) {
            <div style="color: var(--color-danger); font-size: var(--text-sm); margin-bottom: var(--space-4); text-align: center;">
              {{ errorMessage() }}
            </div>
          }

          <button 
            type="submit" 
            class="btn btn-primary" 
            style="width: 100%" 
            [disabled]="loginForm.invalid || isLoading()"
          >
            {{ isLoading() ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="auth-footer-text">
          Don't have an account?
          <a routerLink="/register" class="link" id="login-to-register-link">Sign Up</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg);
      padding: var(--space-4);
    }
    .auth-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      width: 100%;
      max-width: 400px;
      box-shadow: var(--shadow-md);
    }
    .auth-title { margin-bottom: var(--space-2); font-size: var(--text-2xl); font-weight: var(--font-bold); text-align: center; }
    .auth-sub { color: var(--color-text-secondary); text-align: center; margin-bottom: var(--space-6); }
    .auth-form { display: flex; flex-direction: column; gap: var(--space-4); }
    .auth-footer-text { margin-top: var(--space-6); text-align: center; color: var(--color-text-secondary); font-size: var(--text-sm); }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.fb.nonNullable.group({
    email: ['admin@eventhub.local', [Validators.required, Validators.email]],
    password: ['password', [Validators.required]],
    rememberMe: [false]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        // Redirect to requested URL or dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.userMessage || 'An unexpected error occurred.');
      }
    });
  }
}
