import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';

/** Brand Logo Component */
@Component({
  selector: 'hra-brand-logo',
  imports: [CommonModule, AssetUrlPipe, InlineSVGModule],
  templateUrl: './brand-logo.component.html',
  styleUrl: './brand-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogoComponent {
  /** Flag to check if the Logo is small */
  readonly small = input(false, { transform: booleanAttribute });

  /** Computed logo path based on the logo size */
  readonly logoPath = computed(() => `assets/logo/hra-logo-${this.small() ? 'small' : 'regular'}.svg`);

  /** SVG script eval mode */
  protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
}
