import { LocationStrategy } from '@angular/common';
import { inject } from '@angular/core';

/**
 * Get the default base href
 *
 * @returns Base href from LocationStrategy or empty string
 */
export function getDefaultBaseHref(): string {
  try {
    const locationStrategy = inject(LocationStrategy, { optional: true });
    return locationStrategy?.getBaseHref() ?? '';
  } catch {
    return '';
  }
}
