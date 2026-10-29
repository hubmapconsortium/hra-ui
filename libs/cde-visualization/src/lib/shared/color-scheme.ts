import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, DestroyRef, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/** Media query matching a system preference for dark colors */
const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Watches the page's part of what decides whether theme colors resolve to their light or dark values:
 * the system color scheme preference and the `color-scheme` of the document's root element.
 * Must be called in an injection context.
 *
 * @returns A signal whose value changes when either one changes
 */
export function watchPageColorScheme(): Signal<string> {
  const root = inject(DOCUMENT).documentElement;
  const prefersDark$ = inject(BreakpointObserver).observe(PREFERS_DARK_QUERY);
  const prefersDark = toSignal(prefersDark$.pipe(map((state) => state.matches)), { requireSync: true });
  const readRootColorScheme = () => getComputedStyle(root).colorScheme ?? '';
  const rootColorScheme = signal(readRootColorScheme());
  const observer = new MutationObserver(() => rootColorScheme.set(readRootColorScheme()));

  observer.observe(root, { attributes: true });
  inject(DestroyRef).onDestroy(() => observer.disconnect());
  return computed(() => `${rootColorScheme()} ${prefersDark() ? 'dark' : 'light'}`);
}
