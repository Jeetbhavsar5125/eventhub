import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ApiClient } from '../api/api-client.service';
import { User } from '../models/user.model';
import { PlatformRole } from '../models/platform-role.enum';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  RefreshResponse 
} from '../models/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = inject(ApiClient);
  private readonly router = inject(Router);
  
  private readonly TOKEN_KEY = 'access_token';

  // --- State (Signals) ---
  private readonly _currentUser = signal<User | null>(null);
  private readonly _authLoading = signal<boolean>(true);

  // --- Computed State ---
  readonly currentUser = this._currentUser.asReadonly();
  readonly authLoading = this._authLoading.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  
  /**
   * Helper to check if current user has a specific platform role or higher.
   * SuperAdmin > Admin > User
   */
  hasPlatformRoleOrAbove(requiredRole: PlatformRole): boolean {
    const user = this._currentUser();
    if (!user) return false;

    if (user.platformRole === PlatformRole.SuperAdmin) return true;
    if (user.platformRole === PlatformRole.Admin && requiredRole !== PlatformRole.SuperAdmin) return true;
    
    return user.platformRole === requiredRole;
  }

  // --- Initialization ---
  
  /**
   * Called on app startup to restore session if a token exists.
   */
  initializeSession(): Observable<User | null> {
    this._authLoading.set(true);
    const token = this.getToken();

    if (!token) {
      this._authLoading.set(false);
      return of(null);
    }

    return this.api.get<User>('/auth/me').pipe(
      tap((user) => {
        this._currentUser.set(user);
        this._authLoading.set(false);
      }),
      catchError(() => {
        // Token is invalid/expired and couldn't be refreshed
        this.clearSession();
        this._authLoading.set(false);
        return of(null);
      })
    );
  }

  // --- Authentication Actions ---

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this._authLoading.set(true);
    return this.api.post<AuthResponse>('/auth/login', credentials).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        this._authLoading.set(false);
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    this._authLoading.set(true);
    return this.api.post<AuthResponse>('/auth/register', data).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        this._authLoading.set(false);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // Fire and forget logout to backend to invalidate refresh token
    this.api.post('/auth/logout').pipe(catchError(() => of(null))).subscribe();
    
    this.clearSession();
    this.router.navigate(['/login']);
  }

  /**
   * Performs the token refresh. Used by the HTTP interceptor.
   */
  refreshToken(): Observable<RefreshResponse> {
    return this.api.post<RefreshResponse>('/auth/refresh').pipe(
      tap((response) => {
        this.setToken(response.accessToken);
      })
    );
  }

  // --- Token Management ---

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._currentUser.set(null);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.setToken(response.accessToken);
    this._currentUser.set(response.user);
    this._authLoading.set(false);
  }
}
