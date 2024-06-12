import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { mock, MockProxy } from 'jest-mock-extended';
import { createSvgIconResolver } from './resolvers';

describe('createSvgIconResolver', () => {
  let location: MockProxy<Location>;
  let sanitizer: MockProxy<DomSanitizer>;
  let resolver: ReturnType<typeof createSvgIconResolver>;

  beforeEach(() => {
    location = mock<Location>();
    location.prepareExternalUrl.mockImplementation((path) => `https://example.com/${path}`);

    sanitizer = mock<DomSanitizer>();
    sanitizer.bypassSecurityTrustResourceUrl.mockImplementation((path) => path);

    resolver = createSvgIconResolver({
      location,
      sanitizer,
      directory: 'assets/icons',
    });
  });

  it('should resolve icon URL correctly', () => {
    const iconUrl = resolver('home', 'app');
    expect(location.prepareExternalUrl).toHaveBeenCalledWith('assets/icons/app/home.svg');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://example.com/assets/icons/app/home.svg',
    );
    expect(iconUrl).toBe('https://example.com/assets/icons/app/home.svg');
  });

  it('should resolve icon URL without namespace', () => {
    const iconUrl = resolver('home', '');
    expect(location.prepareExternalUrl).toHaveBeenCalledWith('assets/icons/home.svg');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('https://example.com/assets/icons/home.svg');
    expect(iconUrl).toBe('https://example.com/assets/icons/home.svg');
  });

  it('should handle and double slashes', () => {
    const iconUrl = resolver('///facebook', '//app');
    expect(location.prepareExternalUrl).toHaveBeenCalledWith('assets/icons/app/facebook.svg');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://example.com/assets/icons/app/facebook.svg',
    );
    expect(iconUrl).toBe('https://example.com/assets/icons/app/facebook.svg');
  });
});
