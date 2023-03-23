import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { HeaderComponent } from '@hra-ui/components/molecules';
import { ResourceIds as Ids } from '@hra-ui/state';

/** Component for Header Behavior */
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
  readonly productLogoUrl = selectQuerySnapshot(RR.url, Ids.ProductLogoUrl);

  /**
   * Input for product title to displayed on the left side.
   */
  readonly productTitle = selectQuerySnapshot(RR.anyText, Ids.ProductTitle);

  /**
   * Input for app title to show on the left side.
   */
  readonly appTitle = selectQuerySnapshot(RR.anyText, Ids.AppTitle);
}
