import { assertInInjectionContext, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ICONS_CONFIG } from '../tokens';

/** Default classes added to the icon registry */
export const DEFAULT_FONT_CLASSES = ['material-symbols-rounded'];

/**
 * Add user provided font icon classes to the icon registry.
 * Must be called in an injection context.
 */
export function registerFontClasses(): void {
  assertInInjectionContext(registerFontClasses);

  const registry = inject(MatIconRegistry);
  const config = inject(ICONS_CONFIG, { optional: true });
  const initialClasses = registry.getDefaultFontSetClass();
  const configClasses = config?.fontClasses ?? DEFAULT_FONT_CLASSES;
  const classes = Array.from(new Set(chain2(initialClasses, configClasses)));
  registry.setDefaultFontSetClass(...classes);
}

/**
 * Chains two iterables into a single sequence
 *
 * @param iter1 First iterable
 * @param iter2 Second iterable
 * @yields The values from the first iterable followed by the values from the second iterable
 */
function* chain2<T>(iter1: Iterable<T>, iter2: Iterable<T>): Generator<T> {
  yield* iter1;
  yield* iter2;
}
