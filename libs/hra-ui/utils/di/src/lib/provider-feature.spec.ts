import { Provider } from '@angular/core';
import { createProviderFeature, getProvidersForFeatures } from './provider-feature';

describe('ProviderFeature', () => {
  enum TestFeatureKind {
    FeatureA = 'FeatureA',
    FeatureB = 'FeatureB',
  }

  const providers: Provider[] = [
    { provide: 'TestProvider', useValue: 'TestValue' },
    { provide: 'AnotherProvider', useValue: 'AnotherValue' },
  ];

  describe('createProviderFeature', () => {
    it('should create a provider feature with the correct kind and providers', () => {
      const feature = createProviderFeature(TestFeatureKind.FeatureA, providers);
      expect(feature).toEqual({
        kind: TestFeatureKind.FeatureA,
        providers: providers,
      });
    });
  });

  describe('getProvidersForFeatures', () => {
    it('should get all providers from a set of features', () => {
      const featureA = createProviderFeature(TestFeatureKind.FeatureA, [providers[0]]);
      const featureB = createProviderFeature(TestFeatureKind.FeatureB, [providers[1]]);
      const result = getProvidersForFeatures([featureA, featureB]);
      expect(result).toEqual(providers);
    });
  });
});
