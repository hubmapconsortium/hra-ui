import { isSignal, signal } from '@angular/core';
import { createHrefProvider } from './href-provider';

describe('createHrefProvider(provide)', () => {
  it('should accept string values in addition to signals', () => {
    const provide: jest.MockedFn<Parameters<typeof createHrefProvider>[0]> = jest.fn();
    const hrefProvider = createHrefProvider(provide);

    hrefProvider('abc');
    const result1 = provide.mock.calls[0][0]();
    expect(isSignal(result1)).toBeTruthy();

    hrefProvider(() => signal('def'));
    const result2 = provide.mock.calls[1][0]();
    expect(isSignal(result2)).toBeTruthy();
  });
});
