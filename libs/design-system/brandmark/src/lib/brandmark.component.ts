import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule } from 'ng-inline-svg-2';

/**
 * HRA brandmark component
 */
@Component({
  selector: 'hra-brandmark',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, AssetUrlPipe],
  templateUrl: './brandmark.component.html',
  styleUrl: './brandmark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandmarkComponent {
  /** Whether to use the contrast brandmark */
  readonly contrast = input(false);

  /** Path to SVG */
  readonly svgPath = computed(() => {
    return `assets/logo/hra_brandmark${this.contrast() ? '_contrast' : ''}.svg`;
  });
}
