import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TissueDataset } from '@hra-api/ng-client';
import { GlobalConfigState } from 'ccf-shared';

// Returns a unique identifier
const nextUid = (() => {
  let counter = -1;
  return () => {
    counter += 1;
    return counter;
  };
})();

/**
 * List containing sample thumbnails in expanded donor cards
 */
@Component({
  selector: 'ccf-thumbnail-list',
  templateUrl: './thumbnail-list.component.html',
  styleUrls: ['./thumbnail-list.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailListComponent {
  /**
   * Primary css class selector
   */
  @HostBinding('class') readonly className = 'ccf-thumbnail-list';

  /**
   * Items to show in the list
   */
  readonly data = input.required<TissueDataset[]>();

  /**
   * Outputs the result whose link was clicked
   */
  readonly linkClicked = output<TissueDataset>();

  /**
   * Per instance unique identifier
   */
  readonly uid = nextUid();

  readonly baseHref$ = this.globalConfig.getOption('baseHref');

  baseHref = '';

  constructor(private readonly globalConfig: GlobalConfigState<{ baseHref: string }>) {
    this.baseHref$.subscribe((ref) => this.setUrl(ref));
  }

  /**
   * Extract a unique identifier for an item
   *
   * @param _index Unused
   * @param item The item
   * @returns An unique identifier
   */
  itemId(_index: number, item: TissueDataset): string | undefined {
    return item.thumbnail;
  }

  setUrl(url: string) {
    this.baseHref = url;
  }

  thumbnailUrl(item: TissueDataset): string {
    return `url(${this.baseHref + item.thumbnail})`;
  }
}
