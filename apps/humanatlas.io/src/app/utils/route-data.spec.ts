import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { routeData } from './route-data';

@Component({ template: '' })
class DummyComponent {}

describe('routeData', () => {
  it('should return route data signal', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '', component: DummyComponent, data: { test: 'value' } }])],
    });

    TestBed.runInInjectionContext(() => {
      const data = routeData();
      expect(data).toBeDefined();
    });
  });

  it('should return initial value', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '', component: DummyComponent }])],
    });

    TestBed.runInInjectionContext(() => {
      const data = routeData({ initial: true });
      expect(data()).toEqual({ initial: true });
    });
  });

  it('should update on navigation', () => {
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

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    TestBed.runInInjectionContext(() => {
      const data = routeData();
      routerEventsSubject.next(new NavigationEnd(1, '/', '/'));
      expect(data).toBeDefined();
    });
  });
});
