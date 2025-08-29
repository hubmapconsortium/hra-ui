import { ErrorHandler, inject, Injectable } from '@angular/core';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';
import { AnalyticsService } from '../analytics/analytics.service';

/** Configuration for the analytics error handler */
export interface AnalyticsErrorHandlerConfig {
  /** Whether to log errors to console in addition to analytics */
  console?: boolean;
}

/** Configuration */
const CONFIG = createNoopInjectionToken<AnalyticsErrorHandlerConfig>('AnalyticsErrorHandlerConfig');

/** Injects the configuration */
const injectAnalyticsErrorHandlerConfig = CONFIG[0];
/** Provide analytics error handler configuration */
export const provideAnalyticsErrorHandlerConfig = CONFIG[1];

/** Custom error handler that logs to analytics */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsErrorHandler implements ErrorHandler {
  /** Configuration */
  private readonly config = injectAnalyticsErrorHandlerConfig();

  /** Analytics service */
  private readonly analytics = inject(AnalyticsService);

  /**
   * Log an error to analytics
   *
   * @param error Error data
   */
  handleError(error: unknown): void {
    this.analytics.logEvent(CoreEvents.Error, {
      message: 'Uncaught error',
      reason: error,
    });

    if (this.config.console) {
      // eslint-disable-next-line no-console
      console.error('Uncaught error:', error);
    }
  }
}
