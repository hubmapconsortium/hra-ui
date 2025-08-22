import { TestBed } from '@angular/core/testing';
import { AppConfiguration, injectAppConfiguration, provideAppConfiguration } from './app-configuration';

describe('AppConfiguration', () => {
  it('should provide custom configuration', () => {
    const customConfig: AppConfiguration = {
      name: 'Test App',
      version: '1.0.0',
      url: 'https://test.app',
    };

    TestBed.configureTestingModule({
      providers: [provideAppConfiguration(customConfig)],
    });

    TestBed.runInInjectionContext(() => {
      const config = injectAppConfiguration();
      expect(config).toEqual(customConfig);
    });
  });
});
