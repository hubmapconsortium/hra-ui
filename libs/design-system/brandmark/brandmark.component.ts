import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

/**
 * HRA brandmark component
 */
@Component({
  selector: 'hra-brandmark',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './brandmark.component.html',
  styleUrl: './brandmark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandmarkComponent {
  /** Brandmark color variant */
  readonly color = input<string>('default');

  /** Brandmark size to use */
  readonly small = input<boolean>(false);

  /** Path to SVG */
  readonly svgPath = computed(() => {
    return `logo/brandmark_${this.small() ? 'small' : this.color()}.svg`;
  });
}
