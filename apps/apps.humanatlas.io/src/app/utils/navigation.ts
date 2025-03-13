import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router } from '@angular/router';
import { scan, distinctUntilChanged } from 'rxjs';

export function isNavigating(): Signal<boolean> {
  const router = inject(Router);
  const isNavigating$ = router.events.pipe(
    scan((state, event) => {
      switch (event.type) {
        case EventType.NavigationStart:
          return true;
        case EventType.NavigationEnd:
        case EventType.NavigationCancel:
        case EventType.NavigationError:
          return false;

        default:
          return state;
      }
    }, false),
    distinctUntilChanged(),
  );

  return toSignal(isNavigating$, { initialValue: false });
}
