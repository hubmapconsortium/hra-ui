import { InjectionToken } from '@angular/core';

/** Injection token for cache to store yaml file data */
export const YAML_FILE_CACHE = new InjectionToken<Map<string, unknown>>('Yaml file cache', {
  providedIn: 'root',
  factory: () => new Map<string, unknown>(),
});
