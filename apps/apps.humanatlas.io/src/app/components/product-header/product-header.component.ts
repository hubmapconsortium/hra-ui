import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

/** Content product header */
@Component({
  selector: 'hra-product-header',
  standalone: true,
  imports: [HraCommonModule, SoftwareStatusIndicatorComponent],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHeaderComponent {}
