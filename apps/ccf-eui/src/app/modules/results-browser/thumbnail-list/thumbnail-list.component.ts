import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TissueDataset } from '@hra-api/ng-client';
import { HraCommonModule } from '@hra-ui/common';

/**
 * List containing sample thumbnails in expanded donor cards
 */
@Component({
  selector: 'ccf-thumbnail-list',
  imports: [HraCommonModule, MatButtonModule, MatIconModule],
  templateUrl: './thumbnail-list.component.html',
  styleUrl: './thumbnail-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailListComponent {
  /** Items to show in the list */
  readonly data = input.required<TissueDataset[]>();

  /** Outputs the result whose link was clicked */
  readonly linkClicked = output<TissueDataset>();
}
