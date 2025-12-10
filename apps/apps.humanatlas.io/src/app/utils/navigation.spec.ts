import { TestBed } from '@angular/core/testing';
import { EventType, NavigationStart, NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isNavigating } from './navigation';

describe('isNavigating()', () => {
  let events$: Subject<unknown>;

  beforeEach(() => {
    events$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: { events: events$ } }],
    });
  });

  const runIsNavigating = (delay?: number) => TestBed.runInInjectionContext(() => isNavigating(delay));

  it('should start with false', () => {
    const navigating = runIsNavigating(5);
    expect(navigating()).toBe(false);
  });

  it('should become true on NavigationStart', async () => {
    const navigating = runIsNavigating(5);

    events$.next({ type: EventType.NavigationStart, id: 1, url: '/test' } as NavigationStart);
    await new Promise((r) => setTimeout(r, 20));

    expect(navigating()).toBe(true);
  });

  it('should remain false if no NavigationStart is emitted', async () => {
    const navigating = runIsNavigating();

    events$.next(new NavigationEnd(1, '/', '/'));
    await new Promise((r) => setTimeout(r, 20));

    expect(navigating()).toBe(false);
  });

  it('should handle NavigationCancel events', async () => {
    const navigating = runIsNavigating(5);

    events$.next({ type: EventType.NavigationStart, id: 1, url: '/test' } as NavigationStart);
    await new Promise((r) => setTimeout(r, 20));
    expect(navigating()).toBe(true);

    events$.next(new NavigationCancel(1, '/test', ''));
    await new Promise((r) => setTimeout(r, 20));
  });
});
