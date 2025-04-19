import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { CountInfoItem } from './count-info.schema';

/**
 * Displays metrics for the human reference atlas
 */
@Component({
  selector: 'hra-count-info',
  imports: [HraCommonModule, MatCardModule, InlineSVGModule, MatIconModule],
  templateUrl: './count-info.component.html',
  styleUrl: './count-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountInfoComponent {
  /** List of card info to display */
  readonly countInfoList = input.required<CountInfoItem[]>();

  /**
   * Gives icon type in card
   * @param card Card info
   * @returns Icon type
   */
  iconType(card: CountInfoItem): string {
    return 'fontText' in card.icon ? 'fontText' : 'url';
  }

  /**
   * Gets icon from card
   * @param card Card info
   * @returns Icon as material icon name or icon url
   */
  getIcon(card: CountInfoItem): string {
    return 'fontText' in card.icon ? card.icon.fontText : card.icon.url;
  }
}
