import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { findOrThrow } from '@hra-ui/common/array-util';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { DEFAULT_LOGOS } from './default-logos';
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

  /** Logos from app configuration, or use default ones */
  readonly logos = input(injectAppConfiguration().logos ?? DEFAULT_LOGOS);

  /** SVG script eval mode */
  protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;

  /** Logo data */
  protected readonly data = computed(() => findOrThrow(this.logos(), ({ size }) => size === this.size()));
}
