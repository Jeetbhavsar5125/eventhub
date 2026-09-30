import { Injectable, signal, computed } from '@angular/core';
import { AuthState, INITIAL_AUTH_STATE } from '../models/auth-state.model';
import { User, EventRoleAssignment } from '../models/user.model';
import { PlatformRole } from '../models/platform-role.enum';
import { EventRole } from '../models/event-role.enum';
import { Permission } from '../models/permission.model';

/**
 * AuthService — core authentication and authorization service.
 *
 * State is held in an Angular Signal for fine-grained reactivity.
 * All reads are via computed signals or helper methods.
 *
 * NOTE (Chunk 1): This is a structural stub.
 * Real login/logout/token logic will be implemented in the Auth feature chunk.
 *
 * RBAC flow this service supports:
 *   Role → Permission → Guard / UI Authorization → Feature Access
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ── Private writable state ──────────────────────────────────────────────────
  private readonly _authState = signal<AuthState>(INITIAL_AUTH_STATE);

  // ── Public readonly signals ─────────────────────────────────────────────────
  readonly authState = this._authState.asReadonly();
  readonly currentUser = computed<User | null>(() => this._authState().user);
  readonly isAuthenticated = computed<boolean>(() => this._authState().isAuthenticated);
  readonly isLoading = computed<boolean>(() => this._authState().isLoading);
  readonly authError = computed<string | null>(() => this._authState().error);

  // ── Platform role helpers ───────────────────────────────────────────────────

  /**
   * Returns true if the current user holds the given platform-level role.
   */
  hasPlatformRole(role: PlatformRole): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return user.platformRole === role;
  }

  /**
   * Returns true if the current user's platform role is at least as privileged
   * as the required role (SuperAdmin > Admin > User).
   */
  hasPlatformRoleOrAbove(requiredRole: PlatformRole): boolean {
    const hierarchy: PlatformRole[] = [
      PlatformRole.User,
      PlatformRole.Admin,
      PlatformRole.SuperAdmin,
    ];
    const user = this.currentUser();
    if (!user) return false;
    return hierarchy.indexOf(user.platformRole) >= hierarchy.indexOf(requiredRole);
  }

  // ── Event role helpers ──────────────────────────────────────────────────────

  /**
   * Returns the user's role for a specific event, or null if not assigned.
   */
  getEventRole(eventId: string): EventRole | null {
    const user = this.currentUser();
    if (!user) return null;
    const assignment = user.eventRoles.find(
      (r: EventRoleAssignment) => r.eventId === eventId,
    );
    return assignment?.role ?? null;
  }

  /**
   * Returns true if the current user holds the given role for the given event.
   */
  hasEventRole(eventId: string, role: EventRole): boolean {
    return this.getEventRole(eventId) === role;
  }

  // ── Permission helper ───────────────────────────────────────────────────────

  /**
   * Checks whether the current user has a specific permission.
   *
   * TODO (Auth chunk): Build a full permission matrix using RolePermissions
   * and resolve permissions based on platformRole + eventRoles.
   *
   * Stub: returns true for all permissions while auth is not implemented.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasPermission(_permission: Permission): boolean {
    return true;
  }

  // ── State mutators (stubs) ──────────────────────────────────────────────────

  /**
   * Initiates user login.
   * TODO: Implement HTTP call + token storage in Auth feature chunk.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(_email: string, _password: string): void {
    this._authState.update((s) => ({ ...s, isLoading: true, error: null }));
    // TODO: call API, set user, update isAuthenticated
  }

  /**
   * Logs the current user out and resets auth state.
   * TODO: Implement token clearing + API call in Auth feature chunk.
   */
  logout(): void {
    this._authState.set(INITIAL_AUTH_STATE);
    // TODO: clear stored tokens, call logout API
  }
}
