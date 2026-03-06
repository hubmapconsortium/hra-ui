import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';
import { getProvidersForFeatures, ProviderFeature } from '@hra-ui/utils-v2/di';
import { provideRouter } from './injectors';

/** Router extension feature */
export type RouterExtFeature = ProviderFeature<RouterExtFeatureKind>;

/** Router extension feature kind */
const enum RouterExtFeatureKind {}

/**
 * Provide additional router features.
 * Must be used along side of `provideRouter`.
 *
 * @param features Router extension features
 * @returns Environment providers
 */
export function provideRouterExt(...features: RouterExtFeature[]): EnvironmentProviders {
  return makeEnvironmentProviders([provideRouter(() => inject(Router)), ...getProvidersForFeatures(features)]);
}
