import { CanActivateFn } from '@angular/router';
import { createExternalRedirectRoute } from './external-redirect';

describe('createExternalRedirectRoute', () => {
  it('should create a route with component', () => {
    const route = createExternalRedirectRoute('https://example.com');

    expect(route.component).toBeDefined();
  });

  it('should create a route with canActivate guard', () => {
    const route = createExternalRedirectRoute('https://example.com');

    expect(route.canActivate).toBeDefined();
    expect(route.canActivate?.length).toBe(1);
    expect(typeof route.canActivate?.[0]).toBe('function');
  });

  it('should create route with different URL', () => {
    const testUrl = 'https://different-url.com/path';
    const route = createExternalRedirectRoute(testUrl);

    expect(route.component).toBeDefined();
    expect(route.canActivate).toBeDefined();
  });

  it('should create guard that returns true', async () => {
    const route = createExternalRedirectRoute('https://example.com');
    const canActivate = route.canActivate?.[0] as CanActivateFn;

    const result = await canActivate({} as never, {} as never);

    expect(result).toBe(true);
  });
});
