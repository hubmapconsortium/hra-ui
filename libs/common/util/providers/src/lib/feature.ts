import { EnvironmentProviders, Provider } from '@angular/core';

/** Either a regular provider or environment providers */
export type AnyProvider = Provider | EnvironmentProviders;

/** A provider feature */
export interface ProviderFeature<F, P extends AnyProvider = AnyProvider> {
  /** Feature kind. Usually an integer enum value but can be anything. */
  [FEATURE_KIND]: F;
  /** Array of providers */
  [FEATURE_PROVIDERS]: P[];
}

/** Key used to store the feature kind */
const FEATURE_KIND = Symbol();
/** Key used to store the feature providers */
const FEATURE_PROVIDERS = Symbol();

/**
 * Create a new feature object with a kind and providers
 *
 * @param kind Feature kind
 * @param providers Feature providers
 * @returns A feature object
 */
export function createFeature<const F, P extends AnyProvider>(kind: F, providers: P[]): ProviderFeature<F, P> {
  return { [FEATURE_KIND]: kind, [FEATURE_PROVIDERS]: providers };
}

/**
 * Get the providers from a feature object
 *
 * @param feature Feature object
 * @returns Array of providers
 */
export function getFeatureProviders<F, P extends AnyProvider>(feature: ProviderFeature<F, P>): P[] {
  return feature[FEATURE_PROVIDERS];
}
