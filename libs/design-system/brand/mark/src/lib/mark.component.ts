import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { findOrThrow } from '@hra-ui/common/array-util';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { MARKS } from './static-data/parsed';
import { BrandMarkVariant } from './types/marks.schema';

/**
 * HRA brandmark component
 */
@Component({
  selector: 'hra-brand-mark',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, AssetUrlPipe],
  templateUrl: './mark.component.html',
  styleUrl: './mark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandMarkComponent {
  /** Mark variant */
  readonly variant = input<BrandMarkVariant>('default');

  /** SVG script eval mode */
  protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;

  /** Mark data */
  protected readonly data = computed(() => findOrThrow(MARKS, ({ variant }) => variant === this.variant()));
}
