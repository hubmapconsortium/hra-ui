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
function createFeature(kind, providers) {
    return { [FEATURE_KIND]: kind, [FEATURE_PROVIDERS]: providers };
}
/**
 * Get the providers from a feature object
 *
 * @param feature Feature object
 * @returns Array of providers
 */
function getFeatureProviders(feature) {
    return feature[FEATURE_PROVIDERS];
}

/**
 * Generated bundle index. Do not edit.
 */

export { createFeature, getFeatureProviders };
//# sourceMappingURL=hra-ui-common-util-providers.mjs.map
