/**
 * An error indicating that a required resource was not found.
 * The global navigation error handler will automatically navigate to the 404 page
 * when encountering such an error.
 */
export class NotFoundError extends Error {
  /** Error name */
  override readonly name = 'NotFoundError';
}
