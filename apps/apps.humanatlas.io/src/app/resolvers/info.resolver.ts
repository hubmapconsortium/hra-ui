import { inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Returns the info object from the current router navigation, if available
 * @returns The info data as type T, or undefined
 */
export function resolveInfo<T>(): T | undefined {
  const router = inject(Router);
  return router.getCurrentNavigation()?.extras.info as T | undefined;
}
