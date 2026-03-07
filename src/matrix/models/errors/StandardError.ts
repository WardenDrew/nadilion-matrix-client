/**
 * Standard Error Response
 * https://spec.matrix.org/v1.17/client-server-api/#standard-error-response
 */
export interface StandardError {

  /**
   * a unique string which can be used to handle an error message e.g. M_FORBIDDEN.
   * Error codes should have their namespace first in ALL CAPS, followed by a single _.
   * For example, if there was a custom namespace com.mydomain.here,
   * and a FORBIDDEN code, the error code should look like COM.MYDOMAIN.HERE_FORBIDDEN.
   */
  errcode: string|undefined;

  /**
   * A human-readable error message, usually a sentence explaining what went wrong.
   */
  error: string|undefined;
}
