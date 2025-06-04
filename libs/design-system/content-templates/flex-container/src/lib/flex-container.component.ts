import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Layout component that allows for flexible arrangement of child elements.
 */
@Component({
  selector: 'hra-flex-container',
  imports: [HraCommonModule],
  template: '<ng-content />',
  styleUrl: './flex-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.row-gap]': 'rowGap()',
    '[style.column-gap]': 'columnGap()',
  },
})
export class FlexContainerComponent {
  /** Row gap between items */
  readonly rowGap = input<string>();

  /** Column gap between items */
  readonly columnGap = input<string>();
}
