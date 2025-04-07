import { inject, Pipe, PipeTransform } from '@angular/core';
import { buildAssetUrl } from './asset-url';
import { APP_ASSETS_HREF } from './tokens';

/** Pipe for resolving asset urls */
@Pipe({
  name: 'assetUrl',
})
export class AssetUrlPipe implements PipeTransform {
  /** Reference to the base assets url */
  private readonly assetsHref = inject(APP_ASSETS_HREF);

  /**
   * Resolves a relative path against the assets href
   *
   * @param path Path to resolve
   * @param type Optionally convert the resolved path into a css `url(...)`
   * @returns An resolved url
   */
  transform(path: string, type?: 'css'): string {
    return buildAssetUrl(this.assetsHref(), path, type);
  }
}
