import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Layout component that allows for grid arrangement of child elements.
 */
@Component({
  selector: 'hra-grid-container',
  imports: [HraCommonModule],
  template: '<ng-content />',
  styleUrl: './grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.row-gap]': 'rowGap()',
    '[style.column-gap]': 'columnGap()',
    '[style.--min-width]': 'minWidth()',
  },
})
export class GridContainerComponent {
  /** Row gap between items */
  readonly rowGap = input<string>();

  /** Column gap between items */
  readonly columnGap = input<string>();

  readonly minWidth = input<string>();
}
