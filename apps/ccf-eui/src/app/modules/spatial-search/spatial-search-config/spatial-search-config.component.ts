import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterSexEnum } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { OrganInfo } from 'ccf-shared';
import { SpatialSearchInputsComponent } from '../spatial-search-inputs/spatial-search-inputs.component';

/**
 * Config popup for spatial search
 */
@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  imports: [MatIconModule, ButtonsModule, SpatialSearchInputsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchConfigComponent {
  /** Selectable organs */
  readonly organs = input.required<OrganInfo[]>();

  /** Currently selected organ */
  readonly selectedOrgan = input<OrganInfo>();

  /** Currently selected sex */
  readonly sex = input.required<FilterSexEnum>();

  /** Emits when sex is updated */
  readonly updateSex = output<FilterSexEnum>();

  /** Emits when organ is updated */
  readonly updateOrgan = output<OrganInfo>();

  /** Emits when the continue button is clicked */
  readonly buttonClicked = output();

  /** Emits when the close button is clicked */
  readonly closeDialog = output();
}
