import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router } from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * Gets the current route path from router as a signal
 * TODO: Move to Utils
 */
export function currentRoutePath(): Signal<string> {
  const router = inject(Router);
  const route$ = router.events.pipe(
    filter((event) => event.type === EventType.NavigationEnd),
    map((event) => event.urlAfterRedirects),
  );
  return toSignal(route$, { initialValue: router.url });
}
