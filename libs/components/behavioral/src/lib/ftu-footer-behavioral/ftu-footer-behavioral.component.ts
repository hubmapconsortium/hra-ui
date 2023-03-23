import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadFormat, FooterComponent } from '@hra-ui/components/molecules';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { ResourceIds as Ids } from '@hra-ui/state';

@Component({
  selector: 'ftu-ftu-footer-behavioral',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './ftu-footer-behavioral.component.html',
  styleUrls: ['./ftu-footer-behavioral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuFooterBehavioralComponent<T extends DownloadFormat = DownloadFormat> {
  /**
   * Input for product logo URL to displayed on the left side.
   */
  readonly productLogoUrl = selectQuerySnapshot(RR.url, Ids.ProductLogoUrl);

  /**
   * Input for product title to displayed on the left side.
   */
  readonly productTitle = selectQuerySnapshot(RR.anyText, Ids.ProductTitle);

  /** Different download formats options displayed to the user */
  @Input() downloadFormats: T[] = [];

  @Input() size: 'small' | 'large' = 'large';
}
