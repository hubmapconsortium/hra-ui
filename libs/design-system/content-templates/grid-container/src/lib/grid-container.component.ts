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
    '[style.--hra-grid-container-item-min-width]': 'itemMinWidth()',
  },
})
export class GridContainerComponent {
  /** Minimum item width */
  readonly itemMinWidth = input<string>();
}
