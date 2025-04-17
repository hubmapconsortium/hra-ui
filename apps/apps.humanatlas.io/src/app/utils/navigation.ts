import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Event, EventType, Router } from '@angular/router';
import { deriveLoading } from 'ngxtension/derive-loading';
import { filter, switchMap } from 'rxjs';

/**
 * Determines whether the navigation is finished or not.
 * @param event Navigation event
 * @returns Boolean value indicating whether the navigation is finished or not.
 */
function isNavigationFinishEvent(event: Event): boolean {
  return [EventType.NavigationEnd, EventType.NavigationCancel, EventType.NavigationError].includes(event.type);
}

/**
 * Navigation utility function to show progress bar
 * @returns Boolean signal
 */
export function isNavigating(): Signal<boolean> {
  const router = inject(Router);
  const navigationEnd$ = router.events.pipe(
    filter((event) => isNavigationFinishEvent(event)),
    deriveLoading(),
  );
  const navigationStart$ = router.events.pipe(
    filter((event) => event.type === EventType.NavigationStart),
    switchMap(() => navigationEnd$),
  );

  return toSignal(navigationStart$, { initialValue: false });
}
