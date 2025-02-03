import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';

/** Brand mark variant */
export type BrandMarkVariant = 'default' | 'contrast';

/** Urls for different mark variants */
const BRAND_MARK_URLS: Record<BrandMarkVariant, string> = {
  default: 'assets/logo/hra_brandmark.svg',
  contrast: 'assets/logo/hra_brandmark_contrast.svg',
};

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

  /** Url based on variant */
  protected readonly markUrl = computed(() => BRAND_MARK_URLS[this.variant()]);
}
