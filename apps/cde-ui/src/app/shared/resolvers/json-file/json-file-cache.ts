import { InjectionToken } from '@angular/core';

/** Creates an injection token to cache JSON files */
export const JSON_FILE_CACHE = new InjectionToken<Map<string, unknown>>('Json file cache', {
  providedIn: 'root',
  factory: () => new Map<string, unknown>(),
});
