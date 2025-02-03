import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';

/** Logo size */
export type BrandLogoSize = 'small' | 'large';

/** Urls for different logo sizes */
const BRAND_LOGO_URLS: Record<BrandLogoSize, string> = {
  small: 'assets/logo/hra-logo-small.svg',
  large: 'assets/logo/hra-logo-regular.svg',
};

/** Brand Logo Component */
@Component({
  selector: 'hra-brand-logo',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, AssetUrlPipe],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-brand-logo-size-" + size()',
  },
})
export class BrandLogoComponent {
  /** Size of the logo */
  readonly size = input<BrandLogoSize>('large');

  /** SVG script eval mode */
  protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;

  /** Url of the logo svg based on the logo size */
  protected readonly logoUrl = computed(() => BRAND_LOGO_URLS[this.size()]);
}
