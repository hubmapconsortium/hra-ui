import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { createFeature, getFeatureProviders, ProviderFeature } from '@hra-ui/common/util/providers';
import { AnalyticsPlugin } from 'analytics';
import { PLUGINS } from './analytics.service';

/** Features that can be passed to `provideAnalytics` */
export type AnalyticsFeature = ProviderFeature<AnalyticsFeatureKind>;

/** Different kinds of features */
const enum AnalyticsFeatureKind {
  Plugins,
}

/**
 * Add one or more `analytics` plugins
 *
 * @param plugins Plugins and plugin factories
 * @returns An analytics feature
 */
export function withPlugins(
  ...plugins: (AnalyticsPlugin | (() => AnalyticsPlugin))[]
): ProviderFeature<AnalyticsFeatureKind.Plugins> {
  return createFeature(AnalyticsFeatureKind.Plugins, [
    {
      provide: PLUGINS,
      multi: true,
      useValue: plugins,
    },
  ]);
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
