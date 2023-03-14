import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { HeaderComponent } from '@hra-ui/components/molecules';
import { ResourceIds } from '@hra-ui/state';

@Component({
  selector: 'ftu-header-behavior',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './header-behavior.component.html',
  styleUrls: ['./header-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBehaviorComponent {
  /**
   * Input for product logo URL to displayed on the left side.
   */
  readonly productLogoUrl = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.ProductLogoUrl);

  /**
   * Input for product title to displayed on the left side.
   */
  readonly productTitle = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.ProductTitle);

  /**
   * Input for app title to show on the left side.
   */
  readonly appTitle = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.AppTitle);
}
