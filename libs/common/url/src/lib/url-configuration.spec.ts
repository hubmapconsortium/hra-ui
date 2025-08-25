import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import {
  injectUrlConfiguration,
  provideUrlConfiguration,
  resolveUrl,
  assetUrl,
  appUrl,
  pageUrl,
  cssUrl,
  UrlConfiguration,
  UrlResolverService,
  ASSET_HREF,
  APP_HREF,
  BASE_HREF,
  provideUrlResolver,
  provideAssetHref,
  provideAppHref,
  providePageHref,
} from './url-configuration';

describe('URL Configuration', () => {
  describe('injectUrlConfiguration', () => {
    it('should provide default configuration', () => {
      TestBed.configureTestingModule({});

      TestBed.runInInjectionContext(() => {
        const config = injectUrlConfiguration();
        expect(config).toBeDefined();
        expect(typeof config.assetHref).toBe('string');
        expect(config.appHref).toBe('');
        expect(typeof config.baseHref).toBe('string');
      });
    });

    it('should provide custom configuration', () => {
      const customConfig: UrlConfiguration = {
        assetHref: 'https://cdn.example.com/',
        appHref: '/myapp',
        baseHref: '/base/',
      };

      TestBed.configureTestingModule({
        providers: [provideUrlConfiguration(customConfig)],
      });

      TestBed.runInInjectionContext(() => {
        const config = injectUrlConfiguration();
        expect(config).toEqual(customConfig);
      });
    });
  });

  describe('resolveUrl', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideUrlConfiguration({
            assetHref: 'https://example.com/assets/',
            appHref: '/app',
            baseHref: '/base/',
          }),
        ],
      });
    });

    it('should resolve asset URLs correctly', () => {
      TestBed.runInInjectionContext(() => {
        expect(resolveUrl('image.png', 'asset')).toBe('https://example.com/assets/image.png');
        expect(resolveUrl('https://other.com/image.png', 'asset')).toBe('https://other.com/image.png');
      });
    });

    it('should resolve page URLs correctly', () => {
      TestBed.runInInjectionContext(() => {
        expect(resolveUrl('about', 'page')).toBe('/base/about');
        expect(resolveUrl('https://other.com/about', 'page')).toBe('https://other.com/about');
      });
    });

    it('should resolve app URLs correctly', () => {
      TestBed.runInInjectionContext(() => {
        expect(resolveUrl('/app/dashboard', 'app')).toBe('/dashboard');
        expect(resolveUrl('/other/path', 'app')).toBe('/other/path');
      });
    });
  });

  describe('Signal functions', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideUrlConfiguration({
            assetHref: 'https://example.com/assets/',
            appHref: '/app',
            baseHref: '/base/',
          }),
        ],
      });
    });

    it('should create signal for asset URL', () => {
      TestBed.runInInjectionContext(() => {
        const urlSignal = assetUrl('image.png');
        expect(urlSignal()).toBe('https://example.com/assets/image.png');
      });
    });

    it('should create signal for app URL', () => {
      TestBed.runInInjectionContext(() => {
        const urlSignal = appUrl('/app/dashboard');
        expect(urlSignal()).toBe('/dashboard');
      });
    });

    it('should create signal for page URL', () => {
      TestBed.runInInjectionContext(() => {
        const urlSignal = pageUrl('about');
        expect(urlSignal()).toBe('/base/about');
      });
    });

    it('should create signal for CSS URL', () => {
      TestBed.runInInjectionContext(() => {
        const urlSignal = cssUrl('image.png');
        expect(urlSignal()).toBe('url("image.png")');
      });
    });

    it('should work with function input', () => {
      TestBed.runInInjectionContext(() => {
        const getUrl = () => 'image.png';
        const urlSignal = assetUrl(getUrl);
        expect(urlSignal()).toBe('https://example.com/assets/image.png');
      });
    });
  });

  describe('empty configuration handling', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideUrlConfiguration({
            assetHref: '',
            appHref: '',
            baseHref: '',
          }),
        ],
      });
    });

    it('should handle empty configuration', () => {
      TestBed.runInInjectionContext(() => {
        expect(resolveUrl('/app/dashboard', 'app')).toBe('/app/dashboard');
        expect(resolveUrl('image.png', 'asset')).toBe('image.png');
        expect(resolveUrl('about', 'page')).toBe('about');
      });
    });
  });

  describe('Injection Tokens', () => {
    describe('ASSET_HREF', () => {
      it('should provide default assets href', () => {
        const assetHref = TestBed.inject(ASSET_HREF);
        expect(assetHref()).toBeDefined();
        expect(typeof assetHref()).toBe('string');
      });
    });

    describe('APP_HREF', () => {
      it('should provide empty string by default', () => {
        const appHref = TestBed.inject(APP_HREF);
        expect(appHref()).toBe('');
      });
    });

    describe('BASE_HREF', () => {
      it('should provide base href', () => {
        const baseHref = TestBed.inject(BASE_HREF);
        expect(baseHref()).toBeDefined();
        expect(typeof baseHref()).toBe('string');
      });
    });
  });

  describe('UrlResolverService', () => {
    let service: UrlResolverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideAssetHref('https://example.com/assets/'), provideAppHref('/app'), providePageHref('/base/')],
      });
      service = TestBed.inject(UrlResolverService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should resolve asset URLs correctly', () => {
      expect(service.resolveUrl('image.png', 'asset')).toBe('https://example.com/assets/image.png');
      expect(service.resolveUrl('https://other.com/image.png', 'asset')).toBe('https://other.com/image.png');
    });

    it('should resolve page URLs correctly', () => {
      expect(service.resolveUrl('about', 'page')).toBe('/base/about');
      expect(service.resolveUrl('https://other.com/about', 'page')).toBe('https://other.com/about');
    });

    it('should resolve app URLs correctly', () => {
      expect(service.resolveUrl('/app/dashboard', 'app')).toBe('/dashboard');
      expect(service.resolveUrl('/other/path', 'app')).toBe('/other/path');
    });
  });

  describe('Provider Functions', () => {
    describe('provideUrlResolver', () => {
      it('should provide UrlResolverService', () => {
        TestBed.configureTestingModule({
          providers: [provideUrlResolver()],
        });

        const service = TestBed.inject(UrlResolverService);
        expect(service).toBeTruthy();
      });
    });

    describe('provideAssetHref', () => {
      it('should provide string value', () => {
        TestBed.configureTestingModule({
          providers: [provideAssetHref('https://example.com/assets/')],
        });

        const assetHref = TestBed.inject(ASSET_HREF);
        expect(assetHref()).toBe('https://example.com/assets/');
      });

      it('should provide signal value', () => {
        const testSignal = signal('https://example.com/assets/');
        TestBed.configureTestingModule({
          providers: [provideAssetHref(testSignal)],
        });

        const assetHref = TestBed.inject(ASSET_HREF);
        expect(assetHref()).toBe('https://example.com/assets/');
      });

      it('should provide function returning string', () => {
        TestBed.configureTestingModule({
          providers: [provideAssetHref(() => 'https://example.com/assets/')],
        });

        const assetHref = TestBed.inject(ASSET_HREF);
        expect(assetHref()).toBe('https://example.com/assets/');
      });

      it('should provide function returning signal', () => {
        const testSignal = signal('https://example.com/assets/');
        TestBed.configureTestingModule({
          providers: [provideAssetHref(() => testSignal)],
        });

        const assetHref = TestBed.inject(ASSET_HREF);
        expect(assetHref()).toBe('https://example.com/assets/');
      });
    });

    describe('provideAppHref', () => {
      it('should provide string value', () => {
        TestBed.configureTestingModule({
          providers: [provideAppHref('/myapp')],
        });

        const appHref = TestBed.inject(APP_HREF);
        expect(appHref()).toBe('/myapp');
      });
    });

    describe('providePageHref', () => {
      it('should provide string value', () => {
        TestBed.configureTestingModule({
          providers: [providePageHref('/base/')],
        });

        const baseHref = TestBed.inject(BASE_HREF);
        expect(baseHref()).toBe('/base/');
      });
    });
  });
});
