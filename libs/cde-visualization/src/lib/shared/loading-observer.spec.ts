import { signal } from '@angular/core';
import { loadingObserver } from './loading-observer';

describe('loadingObserver(state)', () => {
  it('should track the loading state in the signal', () => {
    const state = signal(false);
    const observer = loadingObserver(state);

    observer.next(true);
    expect(state()).toBe(true);
    observer.next(false);
    expect(state()).toBe(false);
  });
});
