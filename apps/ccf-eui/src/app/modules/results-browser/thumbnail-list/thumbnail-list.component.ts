import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  /** Items to show in the list */
  readonly data = input.required<TissueDataset[]>();

  /** Outputs the result whose link was clicked */
  readonly linkClicked = output<TissueDataset>();

  /** Per instance unique identifier */
  readonly uid = nextUid();

  /** Base href */
  private readonly baseHref = toSignal(inject(GlobalConfigState).getOption('baseHref'), { initialValue: '' });

  /**
   * Returns thumbnail url from item
   * @param item TissueDataset item
   * @returns url
   */
  thumbnailUrl(item: TissueDataset): string {
    return `url(${this.baseHref() + item.thumbnail})`;
  }
}
