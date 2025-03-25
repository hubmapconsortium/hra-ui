import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { findOrThrow } from '@hra-ui/common/array-util';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { LOGOS } from './static-data/parsed';
import { BrandLogoSize } from './types/logos.schema';

/** Brand Logo Component */
@Component({
  selector: 'hra-brand-logo',
  imports: [HraCommonModule, InlineSVGModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-brand-logo-size-" + size()',
  },
})
export class BrandLogoComponent {
  /** Size of the logo */
  readonly size = input<BrandLogoSize>('regular');

  /** SVG script eval mode */
  protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;

  /** Logo data */
  protected readonly data = computed(() => findOrThrow(LOGOS, ({ size }) => size === this.size()));
}
