import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Gallery card component for displaying content with images, dates, and tags
 */
@Component({
  selector: 'hra-gallery-card',
  imports: [AssetUrlPipe, LinkDirective, MatChipsModule, PlainTooltipDirective, TextHyperlinkDirective],
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
  readonly tags = input.required<Map<string, { name: string; description: string }>>();

  /** List of tags for iteration in template */
  readonly tagsList = computed<{ name: string; description: string }[]>(() => {
    return Array.from(this.tags().values());
  });
}
