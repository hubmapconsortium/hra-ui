import { Pipe, PipeTransform } from '@angular/core';
import { injectUrlConfiguration, UrlType } from './url-configuration';
import { Location } from '@angular/common';
import { parseUrl } from './utils';

/**
 * Pipe for resolving URLs based on type
 */
@Pipe({
  name: 'resolveUrl',
  standalone: true,
})
export class ResolveUrlPipe implements PipeTransform {
  private config = injectUrlConfiguration();

  /**
   * Transform URL based on type
   *
   * @param url URL to transform
   * @param type URL type
   * @returns Resolved URL
   */
  transform(url: string, type: UrlType): string {
    if (type === 'asset') {
      if (this.isAbsolute(url)) {
        return url;
      }
      return Location.joinWithSlash(this.config.assetHref || '', url);
    }

    if (type === 'page') {
      if (this.isAbsolute(url)) {
        return url;
      }
      return Location.joinWithSlash(this.config.baseHref || '', url);
    }

    if (type === 'app') {
      const appHref = this.config.appHref || '';
      if (appHref !== '' && url.startsWith(appHref)) {
        return this.removePrefix(url, appHref);
      }
    }

    return url;
  }

  private isAbsolute(url: string): boolean {
    return parseUrl(url) !== null;
  }

  private removePrefix(url: string, prefix: string): string {
    return url.startsWith(prefix) ? url.slice(prefix.length) : url;
  }
}

/**
 * Pipe for resolving asset URLs
 */
@Pipe({
  name: 'assetUrl',
  standalone: true,
})
export class AssetUrlPipe implements PipeTransform {
  private config = injectUrlConfiguration();

  /**
   * Transform URL as asset
   *
   * @param url URL to transform
   * @returns Resolved asset URL
   */
  transform(url: string): string {
    if (parseUrl(url) !== null) {
      return url;
    }
    return Location.joinWithSlash(this.config.assetHref || '', url);
  }
}

/**
 * Pipe for resolving app URLs
 */
@Pipe({
  name: 'appUrl',
  standalone: true,
})
export class AppUrlPipe implements PipeTransform {
  private config = injectUrlConfiguration();

  /**
   * Transform URL as app
   *
   * @param url URL to transform
   * @returns Resolved app URL
   */
  transform(url: string): string {
    const appHref = this.config.appHref || '';
    if (appHref !== '' && url.startsWith(appHref)) {
      return url.startsWith(appHref) ? url.slice(appHref.length) : url;
    }
    return url;
  }
}

/**
 * Pipe for resolving page URLs
 */
@Pipe({
  name: 'pageUrl',
  standalone: true,
})
export class PageUrlPipe implements PipeTransform {
  private config = injectUrlConfiguration();

  /**
   * Transform URL as page
   *
   * @param url URL to transform
   * @returns Resolved page URL
   */
  transform(url: string): string {
    if (parseUrl(url) !== null) {
      return url;
    }
    return Location.joinWithSlash(this.config.baseHref || '', url);
  }
}

/**
 * Pipe for wrapping URLs in CSS url() function
 */
@Pipe({
  name: 'cssUrl',
  standalone: true,
})
export class CssUrlPipe implements PipeTransform {
  /**
   * Transform URL to CSS url() format
   *
   * @param url URL to transform
   * @returns CSS url() wrapped URL
   */
  transform(url: string): string {
    return `url("${url}")`;
  }
}
