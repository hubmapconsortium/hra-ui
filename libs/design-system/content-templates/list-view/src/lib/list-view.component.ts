import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

/**
 * Interface for list view items
 */
export interface ListViewItem {
  /** Markdown content to display */
  content: string;
}

/**
 * Interface for grouped list view data
 */
export interface ListViewGroup {
  /** Group identifier/label */
  group: string;
  /** Items in this group */
  items: ListViewItem[];
}

/**
 * List view component for displaying markdown content in groups
 */
@Component({
  selector: 'hra-list-view',
  imports: [MarkdownComponent, SectionLinkComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  /** Pre-grouped data to display */
  readonly data = input<ListViewGroup[]>([]);

  /** Whether to show groupBy headers */
  readonly groupBy = input<boolean>(false);
}
