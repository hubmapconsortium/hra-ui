import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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

  /**
   * Removes a tag from the list
   *
   * @param tag Tag to remove
   */
  removeTag(tag: Tag): void {
    this.tagRemoved.emit(tag);
  }
}
