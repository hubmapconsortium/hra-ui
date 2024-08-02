import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';

/** Brand Logo Component */
@Component({
  selector: 'hra-brand',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe, InlineSVGModule, HttpClientModule],
  templateUrl: './brand-logo.component.html',
  styleUrl: './brand-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogoComponent {
  /** Flag to check if the Logo is small */
  readonly small = input(false, { transform: booleanAttribute });

  /** SVG script eval mode */
  readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
}
