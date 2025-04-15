import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

/** Content product header */
@Component({
  selector: 'hra-product-header',
  standalone: true,
  imports: [HraCommonModule, ProductLogoComponent, SoftwareStatusIndicatorComponent],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHeaderComponent {
  /** Product logo */
  readonly logo = input.required({ transform: toProductLogoId });
  /** Product name */
  readonly tagline = input.required<string>();
  /** Product status */
  readonly status = input<SoftwareStatus>();
}
