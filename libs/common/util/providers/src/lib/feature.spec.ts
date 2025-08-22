import { makeEnvironmentProviders } from '@angular/core';
import { createFeature, getFeatureProviders } from './feature';

describe('ProviderFeature utility', () => {
  it('should create a feature with providers', () => {
    const providers = [makeEnvironmentProviders([])];
    const feature = createFeature('abc', providers);
    expect(getFeatureProviders(feature)).toBe(providers);
  });
});
