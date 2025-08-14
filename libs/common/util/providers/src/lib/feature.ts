import { EnvironmentProviders, Provider } from '@angular/core';

/** Either a regular provider or environment providers */
export type AnyProvider = Provider | EnvironmentProviders;

/** A provider feature */
export interface ProviderFeature<F, P extends AnyProvider = AnyProvider> {
  /** Feature kind (usually an integer enum value) */
  [FEATURE_KIND]: F;
  /** Array of providers */
  [FEATURE_PROVIDERS]: P[];
}

/** Methods to create and get providers from a feature belonging to this set */
export interface ProviderFeatureSet<S, P extends AnyProvider = AnyProvider> {
  /**
   * Create a new feature
   *
   * @param kind Specific feature kind
   * @param providers Array of providers
   */
  createFeature<const F extends S>(kind: F, providers: P[]): ProviderFeature<F, P>;

  /**
   * Get the providers for a feature
   *
   * @param feature Feature object
   * @returns Array of providers
   */
  getFeatureProviders<F extends S>(feature: ProviderFeature<F, P>): P[];
}

/** Key used to store the feature kind */
const FEATURE_KIND = Symbol();
/** Key used to store the feature providers */
const FEATURE_PROVIDERS = Symbol();

/**
 * Create a feature set
 *
 * @returns An object with feature set methods
 */
export function createProviderFeatureSet<S, P extends AnyProvider = AnyProvider>(): ProviderFeatureSet<S, P> {
  return {
    createFeature: (kind, providers) => ({ [FEATURE_KIND]: kind, [FEATURE_PROVIDERS]: providers }),
    getFeatureProviders: (feature) => feature[FEATURE_PROVIDERS],
  };
}
