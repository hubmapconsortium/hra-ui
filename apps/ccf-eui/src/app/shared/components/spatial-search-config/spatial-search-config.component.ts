import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { OrganInfo } from 'ccf-shared';

import { SpatialSearchInputsComponent } from '../spatial-search-inputs/spatial-search-inputs.component';

/** Sex can either be male or female */
export type Sex = 'male' | 'female';

/**
 * Config popup for spatial search
 */
@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  imports: [MatIconModule, ButtonsModule, SpatialSearchInputsComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  /** Selectable organs */
  organs = input.required<OrganInfo[]>();

  /** Currently selected organ */
  selectedOrgan = input<OrganInfo>();

  /** Currently selected sex */
  sex = input.required<Sex>();

  /** Emits when sex is updated */
  readonly updateSex = output<Sex>();

  /** Emits when organ is updated */
  readonly updateOrgan = output<OrganInfo>();

  /** Emits when the continue button is clicked */
  readonly buttonClicked = output();

  /** Emits when the close button is clicked */
  readonly closeDialog = output();
}
