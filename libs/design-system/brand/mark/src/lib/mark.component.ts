import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { findOrThrow } from '@hra-ui/common/array-util';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { BrandMarkVariant, injectBrandMarks } from './brand-marks';

/**
 * HRA brandmark component
 */
@Component({
  selector: 'hra-brand-mark',
  imports: [HraCommonModule, InlineSVGModule],
  templateUrl: './mark.component.html',
  styleUrl: './mark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandMarkComponent {
  /** Mark variant */
  readonly variant = input<BrandMarkVariant>('default');

  /** Marks from injection token */
  readonly marks = input(injectBrandMarks());

  /** SVG script eval mode */
  protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;

  /** Mark data */
  protected readonly data = computed(() => findOrThrow(this.marks(), ({ variant }) => variant === this.variant()));
}
