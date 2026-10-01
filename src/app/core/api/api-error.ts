/**
 * ApiError — Centralized error class for the application.
 * All HTTP and Network errors should be normalized into this class.
 */
export class ApiError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly userMessage: string;
  public readonly details?: Record<string, string[]>;

  constructor(params: {
    message: string;
    userMessage: string;
    status?: number;
    code?: string;
    details?: Record<string, string[]>;
  }) {
    super(params.message);
    this.name = 'ApiError';
    this.status = params.status;
    this.code = params.code;
    this.userMessage = params.userMessage;
    this.details = params.details;

    // Restore prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Helper to check if the error is a network/timeout error (no response from server).
   */
  public isNetworkError(): boolean {
    return this.status === 0 || this.status === undefined;
  }
}
