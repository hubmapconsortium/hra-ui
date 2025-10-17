import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';

/**
 * Gallery card component for displaying content with images, dates, and tags
 */
@Component({
  selector: 'hra-gallery-card',
  imports: [AssetUrlPipe],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCardComponent {
  /** Title/tagline text */
  readonly tagline = input.required<string>();
  /** Image url to display at the top */
  readonly image = input<string>();
  /** Alt text for image */
  readonly imageAlt = input<string>('');
  /** Date to display */
  readonly date = input<string>();
  /** URL for the tagline link */
  readonly taglineUrl = input<string>();
  /** Whether the link opens in new tab */
  readonly taglineExternal = input<boolean>(false);
  /** Category tag */
  readonly categoryTag = input<string>();
  /** Project tag */
  readonly projectTag = input<string>();
}
