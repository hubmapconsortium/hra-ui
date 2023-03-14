import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadFormat, FooterComponent } from '@hra-ui/components/molecules';

@Component({
  selector: 'ftu-ftu-footer-behavioral',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './ftu-footer-behavioral.component.html',
  styleUrls: ['./ftu-footer-behavioral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuFooterBehavioralComponent<T extends DownloadFormat = DownloadFormat> {
  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  /** Different download formats options displayed to the user */
  @Input() downloadFormats: T[] = [];

  @Input() size: 'small' | 'large' = 'large';
}
