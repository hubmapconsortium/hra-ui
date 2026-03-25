import { Provider, EnvironmentProviders } from '@angular/core';

/** Either a regular provider or environment providers */
type AnyProvider = Provider | EnvironmentProviders;
/** A provider feature */
interface ProviderFeature<F, P extends AnyProvider = AnyProvider> {
    /** Feature kind. Usually an integer enum value but can be anything. */
    [FEATURE_KIND]: F;
    /** Array of providers */
    [FEATURE_PROVIDERS]: P[];
}
/** Key used to store the feature kind */
declare const FEATURE_KIND: unique symbol;
/** Key used to store the feature providers */
declare const FEATURE_PROVIDERS: unique symbol;
/**
 * Create a new feature object with a kind and providers
 *
 * @param kind Feature kind
 * @param providers Feature providers
 * @returns A feature object
 */
declare function createFeature<const F, P extends AnyProvider>(kind: F, providers: P[]): ProviderFeature<F, P>;
/**
 * Get the providers from a feature object
 *
 * @param feature Feature object
 * @returns Array of providers
 */
declare function getFeatureProviders<F, P extends AnyProvider>(feature: ProviderFeature<F, P>): P[];

export { createFeature, getFeatureProviders };
export type { ProviderFeature };
