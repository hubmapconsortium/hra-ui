import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/** No Results Indicator component */
@Component({
  selector: 'hra-no-results-indicator',
  imports: [HraCommonModule, MatIconModule, ButtonsModule],
  templateUrl: './no-results-indicator.component.html',
  styleUrl: './no-results-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultsIndicatorComponent {
  /** Output event that gets triggered on button click */
  readonly clearFilters = output<void>();
}
