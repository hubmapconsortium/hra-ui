import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { PublicationItem } from '../../../state/studies/with-studies.feature';

@Component({
  selector: 'cde-source-data-menu',
  imports: [HraCommonModule, ButtonsModule, LinkDirective, PlainTooltipDirective, MatMenuModule],
  templateUrl: './source-data-menu.component.html',
  styleUrl: './source-data-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceDataMenuComponent {
  readonly publications = input.required<PublicationItem[]>();
}
