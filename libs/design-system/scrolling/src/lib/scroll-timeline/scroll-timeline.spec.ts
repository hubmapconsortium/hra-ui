import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject, isObservable } from 'rxjs';
import { SCROLL_TIMELINE, SCROLL_TIMELINE_QUERY_INTERVAL, ScrollTimelineFunc } from './scroll-timeline';

describe('SCROLL_TIMELINE_QUERY_INTERVAL', () => {
  it('is an observable', () => {
    const value = TestBed.inject(SCROLL_TIMELINE_QUERY_INTERVAL);
    expect(isObservable(value)).toBeTruthy();
  });
});

describe('SCROLL_TIMELINE', () => {
  const mockScrollTimeline: jest.MockedClass<ScrollTimelineFunc> = jest.fn();
  let intervalSubject: Subject<number>;

  let restoreScrollTimeline: (() => void) | undefined;
  function overrideScrollTimeline(value: ScrollTimelineFunc | undefined): void {
    restoreScrollTimeline?.();

    const original = Object.getOwnPropertyDescriptor(globalThis, 'ScrollTimeline');
    Object.defineProperty(globalThis, 'ScrollTimeline', { configurable: true, writable: true, value });
    restoreScrollTimeline = () => {
      if (original) {
        Object.defineProperty(globalThis, 'ScrollTimeline', original);
      } else {
        delete (globalThis as { ScrollTimeline?: ScrollTimelineFunc }).ScrollTimeline;
      }
    };
  }

  beforeEach(() => {
    intervalSubject = new Subject();
    TestBed.overrideProvider(SCROLL_TIMELINE_QUERY_INTERVAL, { useValue: intervalSubject });
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'browser' });
  });

  afterEach(() => {
    restoreScrollTimeline?.();
  });

  it('returns null if the platform is not a browser', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'unknown' });
    overrideScrollTimeline(undefined);
    const scrollTimeline = TestBed.inject(SCROLL_TIMELINE);
    expect(scrollTimeline()).toBeNull();
    expect(intervalSubject.observed).toBeFalsy();
  });

  it('returns ScrollTimeline if it exists on the global object', () => {
    overrideScrollTimeline(mockScrollTimeline);
    const scrollTimeline = TestBed.inject(SCROLL_TIMELINE);
    expect(scrollTimeline()).toBe(mockScrollTimeline);
    expect(intervalSubject.observed).toBeFalsy();
  });

  it('subscribes to the interval provider and checks ScrollTimeline availability on each emit', () => {
    overrideScrollTimeline(undefined);
    const scrollTimeline = TestBed.inject(SCROLL_TIMELINE);
    expect(scrollTimeline()).toBeNull();
    expect(intervalSubject.observed).toBeTruthy();

    overrideScrollTimeline(mockScrollTimeline);
    intervalSubject.next(0);
    TestBed.flushEffects();
    expect(scrollTimeline()).toBe(mockScrollTimeline);
    expect(intervalSubject.observed).toBeFalsy();
  });
});
