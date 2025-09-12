import {
  EnvironmentProviders,
  ErrorHandler as ErrorHandlerToken,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { createFeature, getFeatureProviders, ProviderFeature } from '@hra-ui/common/util/providers';
import { AnalyticsPlugin } from 'analytics';
import {
  AnalyticsErrorHandler,
  AnalyticsErrorHandlerConfig,
  provideAnalyticsErrorHandlerConfig,
} from './analytics-features/error-handler';
import { setupRouterEventListener } from './analytics-features/router-events';
import { providePlugin } from './analytics/analytics.service';

/** Features that can be passed to `provideAnalytics` */
export type AnalyticsFeature = ProviderFeature<AnalyticsFeatureKind>;

/** Different kinds of features */
const enum AnalyticsFeatureKind {
  ErrorHandler,
  Plugins,
  RouterEvents,
}

/**
 * Install a global `ErrorHandler` that logs errors to analytics
 *
 * @returns An analytics feature
 */
export function withErrorHandler(config: AnalyticsErrorHandlerConfig = {}): AnalyticsFeature {
  return createFeature(AnalyticsFeatureKind.ErrorHandler, [
    provideAnalyticsErrorHandlerConfig(config),
    {
      provide: ErrorHandlerToken,
      useExisting: AnalyticsErrorHandler,
    },
  ]);
}

/**
 * Add one or more `analytics` plugins
 *
 * @param plugins Plugins and plugin factories
 * @returns An analytics feature
 */
export function withPlugins(...plugins: (AnalyticsPlugin | (() => AnalyticsPlugin))[]): AnalyticsFeature {
  return createFeature(
    AnalyticsFeatureKind.Plugins,
    plugins.map((plugin) => providePlugin(plugin)),
  );
}

/**
 * Log events from the angular router to analytics
 *
 * @returns An analytics feature
 */
export function withRouterEvents(): AnalyticsFeature {
  return createFeature(AnalyticsFeatureKind.RouterEvents, [provideAppInitializer(setupRouterEventListener)]);
}

/**
 * Provide analytics with features
 *
 * @param features Any number of analytics features
 * @returns Environment providers
 */
export function provideAnalytics(...features: AnalyticsFeature[]): EnvironmentProviders {
  return makeEnvironmentProviders([...features.flatMap(getFeatureProviders)]);
}
