import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Gallery card component for displaying content with images, dates, and tags
 */
@Component({
  selector: 'hra-gallery-card',
  imports: [AssetUrlPipe, LinkDirective, MatChipsModule, MatTooltipModule, TextHyperlinkDirective],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCardComponent {
  /** Title/tagline text */
  readonly tagline = input.required<string>();
  /** Image source URL to display at the top */
  readonly imageSrc = input.required<string>();
  /** Date to display */
  readonly date = input.required<string>();
  /** URL for the tagline link */
  readonly link = input.required<string>();
  /** Whether the link opens in new tab */
  readonly external = input<boolean>(false);
  /** Tags to display */
  readonly tags = input<string[]>([]);
}
