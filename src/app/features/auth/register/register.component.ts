import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormFieldComponent],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-sub">Join EventHub today.</p>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
            <app-form-field label="First Name">
              <input type="text" formControlName="firstName" class="input-control" placeholder="John" />
            </app-form-field>
            <app-form-field label="Last Name">
              <input type="text" formControlName="lastName" class="input-control" placeholder="Doe" />
            </app-form-field>
          </div>

          <app-form-field label="Email Address">
            <input type="email" formControlName="email" class="input-control" placeholder="name@company.com" />
          </app-form-field>

          <app-form-field label="Password">
            <input type="password" formControlName="password" class="input-control" placeholder="Create a strong password" />
          </app-form-field>
          
          <app-form-field label="Confirm Password">
            <input type="password" formControlName="confirmPassword" class="input-control" placeholder="Repeat your password" />
          </app-form-field>

          @if (errorMessage()) {
            <div style="color: var(--color-danger); font-size: var(--text-sm); margin-bottom: var(--space-4); text-align: center;">
              {{ errorMessage() }}
            </div>
          }
          
          @if (registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched) {
            <div style="color: var(--color-danger); font-size: var(--text-sm); margin-bottom: var(--space-4); text-align: center;">
              Passwords do not match.
            </div>
          }

          <button 
            type="submit" 
            class="btn btn-primary" 
            style="width: 100%; margin-top: var(--space-4);" 
            [disabled]="registerForm.invalid || isLoading()"
          >
            {{ isLoading() ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>

        <p class="auth-footer-text">
          Already have an account?
          <a routerLink="/login" class="link">Sign In</a>
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
      max-width: 450px;
      box-shadow: var(--shadow-md);
    }
    .auth-title { margin-bottom: var(--space-2); font-size: var(--text-2xl); font-weight: var(--font-bold); text-align: center; }
    .auth-sub { color: var(--color-text-secondary); text-align: center; margin-bottom: var(--space-6); }
    .auth-form { display: flex; flex-direction: column; gap: var(--space-4); }
    .auth-footer-text { margin-top: var(--space-6); text-align: center; color: var(--color-text-secondary); font-size: var(--text-sm); }
  `]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(g: any) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { confirmPassword, ...data } = this.registerForm.getRawValue();

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.userMessage || 'An unexpected error occurred during registration.');
      }
    });
  }
}
