import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { Tag } from '../../../core/models/anatomical-structure-tag';

/**
 * A list of removable tags
 */
@Component({
  selector: 'ccf-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TagListComponent {
  /** List label */
  readonly label = input.required<string>();

  /**
   * The tags
   */
  readonly tags = input.required<Tag[]>();

  /**
   * Emits when a tag is removed
   */
  readonly tagRemoved = output<Tag>();

  /** Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * Removes a tag from the list
   *
   * @param tag Tag to remove
   */
  removeTag(tag: Tag): void {
    this.ga.event('tag_removed', 'tag_list', tag.label);
    this.tagRemoved.emit(tag);
  }
}
