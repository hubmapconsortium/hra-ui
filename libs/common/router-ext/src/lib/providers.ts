import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';
import { getFeatureProviders, ProviderFeature } from '@hra-ui/common/util/providers';
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
  return makeEnvironmentProviders([provideRouter(() => inject(Router)), ...features.flatMap(getFeatureProviders)]);
}
