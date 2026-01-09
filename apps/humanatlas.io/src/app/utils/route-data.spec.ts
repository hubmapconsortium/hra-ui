import { Component, runInInjectionContext } from '@angular/core';
import { NavigationEnd, Router, provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { Subject } from 'rxjs';
import { routeData } from './route-data';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('routeData', () => {
  it('should return route data signal', async () => {
    const { fixture } = await render(DummyComponent, {
      providers: [provideRouter([{ path: '', component: DummyComponent, data: { test: 'value' } }])],
    });

    const injector = fixture.debugElement.injector;
    runInInjectionContext(injector, () => {
      const data = routeData();
      expect(data).toBeDefined();
      expect(typeof data).toBe('function');
    });
  });

  it('should return initial value', async () => {
    const { fixture } = await render(DummyComponent, {
      providers: [provideRouter([{ path: '', component: DummyComponent }])],
    });

    const injector = fixture.debugElement.injector;
    runInInjectionContext(injector, () => {
      const data = routeData({ initial: true });
      expect(data()).toEqual({ initial: true });
    });
  });

  it('should update on navigation', async () => {
    const routerEventsSubject = new Subject<NavigationEnd>();
    const mockRouter = {
      events: routerEventsSubject.asObservable(),
      routerState: {
        snapshot: {
          root: {
            data: { page: 'home' },
            firstChild: null,
          },
        },
      },
    } as unknown as Router;

    const { fixture } = await render(DummyComponent, {
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    const injector = fixture.debugElement.injector;
    runInInjectionContext(injector, () => {
      const data = routeData();
      routerEventsSubject.next(new NavigationEnd(1, '/', '/'));
      expect(data).toBeDefined();
    });
  });
});
