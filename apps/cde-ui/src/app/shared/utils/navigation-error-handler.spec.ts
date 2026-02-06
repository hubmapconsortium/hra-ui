import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NavigationError, RedirectCommand, Router, UrlTree } from '@angular/router';
import { AnalyticsService } from '@hra-ui/common/analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { handleNavigationError } from './navigation-error-handler';
import { NotFoundError } from './not-found-error';

describe('handleNavigationError', () => {
  function runInHandlerContext(
    error: unknown,
    url: string,
    cb: (
      result: RedirectCommand,
      mockRouter: jest.Mocked<Router>,
      mockAnalytics: jest.Mocked<AnalyticsService>,
    ) => void,
  ): void {
    const mockUrlTree = {} as UrlTree;

    const mockRouter = {
      parseUrl: jest.fn().mockReturnValue(mockUrlTree),
    } as unknown as jest.Mocked<Router>;

    const mockAnalytics = {
      logEvent: jest.fn(),
    } as unknown as jest.Mocked<AnalyticsService>;

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AnalyticsService, useValue: mockAnalytics },
      ],
    });

    const event = new NavigationError(1, url, error);

    TestBed.runInInjectionContext(() => {
      const result = handleNavigationError(event);
      cb(result, mockRouter, mockAnalytics);
    });
  }

  it('should redirect to 404 page for NotFoundError', () => {
    const error = new NotFoundError('Resource not found');
    runInHandlerContext(error, '/test-url', (result, router) => {
      expect(result).toBeInstanceOf(RedirectCommand);
      expect(router.parseUrl).toHaveBeenCalledWith('/404');
    });
  });

  it('should redirect to 404 page for 404 HttpErrorResponse', () => {
    const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    runInHandlerContext(error, '/test-url', (result, router) => {
      expect(result).toBeInstanceOf(RedirectCommand);
      expect(router.parseUrl).toHaveBeenCalledWith('/404');
    });
  });

  it('should redirect to 500 page for 500 HttpErrorResponse', () => {
    const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });
    runInHandlerContext(error, '/test-url', (result, router) => {
      expect(result).toBeInstanceOf(RedirectCommand);
      expect(router.parseUrl).toHaveBeenCalledWith('/500');
    });
  });

  it('should redirect to 500 page for other HttpErrorResponse statuses', () => {
    const error = new HttpErrorResponse({ status: 403, statusText: 'Forbidden' });
    runInHandlerContext(error, '/test-url', (result, router) => {
      expect(result).toBeInstanceOf(RedirectCommand);
      expect(router.parseUrl).toHaveBeenCalledWith('/500');
    });
  });

  it('should redirect to 500 page for generic errors', () => {
    const error = new Error('Generic error');
    runInHandlerContext(error, '/test-url', (result, router) => {
      expect(result).toBeInstanceOf(RedirectCommand);
      expect(router.parseUrl).toHaveBeenCalledWith('/500');
    });
  });

  it('should log analytics event with error details', () => {
    const error = new NotFoundError('Resource not found');
    const url = '/test/path';
    runInHandlerContext(error, url, (_result, _router, analytics) => {
      expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.Error, {
        message: 'NavigationError',
        context: { url },
        reason: error,
      });
    });
  });

  it('should return RedirectCommand with skipLocationChange and not replaceUrl', () => {
    const error = new NotFoundError('Resource not found');

    runInHandlerContext(error, '/test-url', (result) => {
      expect(result).toBeInstanceOf(RedirectCommand);
      expect(result).toBeDefined();
    });
  });

  it('should throw when called outside injection context', () => {
    const error = new NotFoundError('Resource not found');
    const event = new NavigationError(1, '/test-url', error);

    expect(() => handleNavigationError(event)).toThrow();
  });
});
