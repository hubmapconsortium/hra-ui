import { ChangeDetectorRef, Pipe, PipeTransform, effect, inject } from '@angular/core';
import { computedPrevious } from 'ngxtension/computed-previous';
import { AppHrefService } from './app-href.service';

/** Create a full url with the appHref prefixed */
@Pipe({
  name: 'assetUrl',
  standalone: true,
  pure: false,
})
export class AssetUrlPipe implements PipeTransform {
  /** Current appHref value signal */
  private readonly appHref = inject(AppHrefService).appHref;
  /** Previous appHref value signal */
  private readonly prevHref = computedPrevious(this.appHref);
  /** Reference to the change detector */
  private readonly cdr = inject(ChangeDetectorRef);
  /** Notifies the change detection when the appHref changes */
  protected readonly markChangeRef = effect(() => {
    if (this.prevHref() !== null) {
      this.cdr.markForCheck();
    }
  });

  /**
   * Prefixes an asset path with the current appHref value
   * @param path Path to asset
   * @param type Whether the url will be bound to a css property
   * @returns A full url
   */
  transform(path: string, type?: 'css'): string {
    const url = `${this.appHref()}${path}`;
    return type === 'css' ? `url("${url}")` : url;
  }
}
