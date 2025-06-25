import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';

@Component({
  selector: 'hra-filter-menu-overlay',
  imports: [HraCommonModule, IconsModule, ButtonsModule],
  templateUrl: './filter-menu-overlay.component.html',
  styleUrl: './filter-menu-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuOverlayComponent {
  readonly filter = input<string>();
}
