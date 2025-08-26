import { inject, Pipe, PipeTransform } from '@angular/core';
import { UrlResolverService, UrlType } from './url-resolver.service';

/**
 * Pipe for resolving URLs based on type
 */
@Pipe({
  name: 'resolveUrl',
})
export class ResolveUrlPipe implements PipeTransform {
  private readonly resolver = inject(UrlResolverService);

  /**
   * Transform URL based on type
   *
   * @param url URL to transform
   * @param type URL type
   * @returns Resolved URL
   */
  transform(url: string, type: UrlType): string {
    return this.resolver.resolveUrl(url, type);
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
  private readonly resolver = inject(UrlResolverService);

  /**
   * Transform URL as asset
   *
   * @param url URL to transform
   * @returns Resolved asset URL
   */
  transform(url: string): string {
    return this.resolver.resolveUrl(url, 'app');
  }
}

/**
 * Pipe for resolving asset URLs
 */
@Pipe({
  name: 'assetUrl',
})
export class AssetUrlPipe implements PipeTransform {
  private readonly resolver = inject(UrlResolverService);

  /**
   * Transform URL as asset
   *
   * @param url URL to transform
   * @returns Resolved asset URL
   */
  transform(url: string): string {
    return this.resolver.resolveUrl(url, 'asset');
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
  private readonly resolver = inject(UrlResolverService);

  /**
   * Transform URL as asset
   *
   * @param url URL to transform
   * @returns Resolved asset URL
   */
  transform(url: string): string {
    return this.resolver.resolveUrl(url, 'page');
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
