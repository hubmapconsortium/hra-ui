import { inject, Pipe, PipeTransform } from '@angular/core';
import { APP_ASSETS_HREF } from './tokens';

@Pipe({
  name: 'assetUrl',
})
export class AssetUrlPipe implements PipeTransform {
  private readonly assetsHref = inject(APP_ASSETS_HREF);

  transform(path: string, type?: 'css'): string {
    const url = new URL(path, this.assetsHref()).toString();
    return type === 'css' ? `url("${url}")` : url;
  }
}
