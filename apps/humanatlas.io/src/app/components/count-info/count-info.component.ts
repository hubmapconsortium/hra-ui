import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HraCommonModule } from '@hra-ui/common';
import { CountInfoItem } from './count-info.schema';
import { IconsModule } from '@hra-ui/design-system/icons';

/**
 * Displays metrics for the human reference atlas
 */
@Component({
  selector: 'hra-count-info',
  imports: [HraCommonModule, IconsModule, MatCardModule],
  templateUrl: './count-info.component.html',
  styleUrl: './count-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountInfoComponent {
  /** List of card info to display */
  readonly countInfoList = input.required<CountInfoItem[]>();
}
