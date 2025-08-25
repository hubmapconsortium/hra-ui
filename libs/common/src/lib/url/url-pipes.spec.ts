import { TestBed } from '@angular/core/testing';
import { ResolveUrlPipe, AssetUrlPipe, AppUrlPipe, PageUrlPipe, CssUrlPipe } from './url-pipes';
import { provideUrlConfiguration } from './url-configuration';

describe('URL Pipes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResolveUrlPipe,
        AssetUrlPipe,
        AppUrlPipe,
        PageUrlPipe,
        CssUrlPipe,
        provideUrlConfiguration({
          assetHref: 'https://example.com/assets/',
          appHref: '/app',
          baseHref: '/base/',
        }),
      ],
    });
  });

  describe('ResolveUrlPipe', () => {
    let pipe: ResolveUrlPipe;

    beforeEach(() => {
      pipe = TestBed.inject(ResolveUrlPipe);
    });

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

    it('should resolve asset URL', () => {
      expect(pipe.transform('image.png', 'asset')).toBe('https://example.com/assets/image.png');
    });

    it('should resolve page URL', () => {
      expect(pipe.transform('about', 'page')).toBe('/base/about');
    });

    it('should resolve app URL', () => {
      expect(pipe.transform('/app/dashboard', 'app')).toBe('/dashboard');
    });
  });

  describe('AssetUrlPipe', () => {
    let pipe: AssetUrlPipe;

    beforeEach(() => {
      pipe = TestBed.inject(AssetUrlPipe);
    });

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

    it('should transform asset URL', () => {
      expect(pipe.transform('image.png')).toBe('https://example.com/assets/image.png');
    });
  });

  describe('AppUrlPipe', () => {
    let pipe: AppUrlPipe;

    beforeEach(() => {
      pipe = TestBed.inject(AppUrlPipe);
    });

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

    it('should transform app URL', () => {
      expect(pipe.transform('/app/dashboard')).toBe('/dashboard');
    });
  });

  describe('PageUrlPipe', () => {
    let pipe: PageUrlPipe;

    beforeEach(() => {
      pipe = TestBed.inject(PageUrlPipe);
    });

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

    it('should transform page URL', () => {
      expect(pipe.transform('about')).toBe('/base/about');
    });
  });

  describe('CssUrlPipe', () => {
    let pipe: CssUrlPipe;

    beforeEach(() => {
      pipe = TestBed.inject(CssUrlPipe);
    });

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

    it('should wrap URL in CSS url() function', () => {
      expect(pipe.transform('image.png')).toBe('url("image.png")');
    });
  });
});
