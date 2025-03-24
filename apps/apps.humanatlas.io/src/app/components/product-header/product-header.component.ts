import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

/** Content product header */
@Component({
  selector: 'hra-product-header',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe, SoftwareStatusIndicatorComponent],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHeaderComponent {
  /** Image URL */
  imageUrl = input.required<string>();
  /** Title */
  title = input.required<string>();
}
