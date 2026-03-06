import { EnvironmentProviders, Provider } from '@angular/core';
import { Tagged } from 'type-fest';

/**
 * Provider feature for simplifying the implementation of the
 * [provider feature pattern](https://angular.dev/guide/di/defining-dependency-providers#advanced-provider-patterns-with-options) in Angular.
 *
 * Basic example of how to create and use provider features:
 * ```ts
 * // Define a feature kind enum
 * enum MyFeatureKind {
 *   FeatureA,
 *   FeatureB,
 * }
 *
 * // Create a feature type
 * type MyFeature = ProviderFeature<MyFeatureKind>;
 *
 * // Feature factory functions
 * function withMyFeatureA(): MyFeature {
 *   return createProviderFeature(MyFeatureKind.FeatureA, [FeatureAProvider]);
 * }
 *
 * function withMyFeatureB(options: FeatureBOptions): MyFeature {
 *   return createProviderFeature(MyFeatureKind.FeatureB, [{ provide: FeatureBConfig, useValue: options }]);
 * }
 *
 * // Provider function
 * function provideMyFeature(...features: MyFeature[]): EnvironmentProvider {
 *   return makeEnvironmentProviders([
 *     // Required providers for this feature, etc.
 *     MyRequiredProvider,
 *     // Add individual feature providers
 *     ...getProvidersForFeatures(features)
 *   ]);
 * }
 * ```
 */
export type ProviderFeature<KindT, ProviderT = Provider | EnvironmentProviders> = Tagged<
  {
    readonly kind: KindT;
    readonly providers: readonly ProviderT[];
  },
  'ProviderFeature'
>;

/**
 * Create a provider feature object with a kind and providers
 *
 * @param kind Feature kind
 * @param providers Array of providers for the feature
 * @returns A provider feature object
 */
export function createProviderFeature<KindT, ProviderT>(
  kind: KindT,
  providers: readonly ProviderT[],
): ProviderFeature<KindT, ProviderT> {
  return { kind, providers } as ProviderFeature<KindT, ProviderT>;
}

/**
 * Get all providers from an array of provider features as a flat array
 *
 * @param features Array of provider features
 * @returns Flat array of all providers from the features
 */
export function getProvidersForFeatures<KindT, ProviderT>(
  features: readonly ProviderFeature<KindT, ProviderT>[],
): ProviderT[] {
  return features.flatMap((feature) => feature.providers);
}
