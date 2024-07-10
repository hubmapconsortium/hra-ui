import { signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { mock, MockProxy } from 'jest-mock-extended';
import { createSvgIconResolver } from './resolvers';

describe('createSvgIconResolver', () => {
  let sanitizer: MockProxy<DomSanitizer>;
  let resolver: ReturnType<typeof createSvgIconResolver>;

  beforeEach(() => {
    sanitizer = mock<DomSanitizer>();
    sanitizer.bypassSecurityTrustResourceUrl.mockImplementation((path) => path);

    resolver = createSvgIconResolver({
      appHref: signal('https://example.com/'),
      sanitizer,
      directory: 'assets/icons',
    });
  });

  it('should resolve icon URL correctly', () => {
    const iconUrl = resolver('home', 'app');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://example.com/assets/icons/app/home.svg',
    );
    expect(iconUrl).toBe('https://example.com/assets/icons/app/home.svg');
  });

  it('should resolve icon URL without namespace', () => {
    const iconUrl = resolver('home', '');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('https://example.com/assets/icons/home.svg');
    expect(iconUrl).toBe('https://example.com/assets/icons/home.svg');
  });

  it('should handle and double slashes', () => {
    const iconUrl = resolver('///facebook', '//app');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://example.com/assets/icons/app/facebook.svg',
    );
    expect(iconUrl).toBe('https://example.com/assets/icons/app/facebook.svg');
  });
});
