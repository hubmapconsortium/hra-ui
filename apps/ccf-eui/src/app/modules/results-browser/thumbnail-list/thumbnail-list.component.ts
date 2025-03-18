import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TissueDataset } from '@hra-api/ng-client';
import { GlobalConfigState } from 'ccf-shared';

/** Returns a unique identifier */
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
  /** Primary css class selector */
  @HostBinding('class') readonly className = 'ccf-thumbnail-list';

  /** Items to show in the list */
  readonly data = input.required<TissueDataset[]>();

  /** Outputs the result whose link was clicked */
  readonly linkClicked = output<TissueDataset>();

  /** Per instance unique identifier */
  readonly uid = nextUid();

  /** Base href observable from global config */
  readonly baseHref$ = this.globalConfig.getOption('baseHref');

  /** Base href */
  baseHref = '';

  /**
   * Creates an instance of thumbnail list component.
   * @param globalConfig Global config state
   */
  constructor(private readonly globalConfig: GlobalConfigState<{ baseHref: string }>) {
    this.baseHref$.subscribe((ref) => (this.baseHref = ref));
  }

  /**
   * Returns thumbnail url from item
   * @param item TissueDataset item
   * @returns url
   */
  thumbnailUrl(item: TissueDataset): string {
    return `url(${this.baseHref + item.thumbnail})`;
  }
}
