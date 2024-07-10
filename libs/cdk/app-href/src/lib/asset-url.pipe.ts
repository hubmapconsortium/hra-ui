import { ChangeDetectorRef, Pipe, PipeTransform, effect, inject } from '@angular/core';
import { computedPrevious } from 'ngxtension/computed-previous';
import { AppHrefService } from './app-href.service';

@Pipe({
  name: 'assetUrl',
  standalone: true,
  pure: false,
})
export class AssetUrlPipe implements PipeTransform {
  private readonly appHref = inject(AppHrefService).appHref;
  private readonly prevHref = computedPrevious(this.appHref);
  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly markChangeRef = effect(() => {
    if (this.prevHref() !== null) {
      this.cdr.markForCheck();
    }
  });

  transform(path: string, type?: 'css'): string {
    const url = `${this.appHref()}${path}`;
    return type === 'css' ? `url("${url}")` : url;
  }
}
