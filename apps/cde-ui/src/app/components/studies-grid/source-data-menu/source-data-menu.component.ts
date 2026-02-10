import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { PublicationItem } from '../../../schemas/studies/utils';

/**
 * Component for displaying a menu with source data links for a study, such as publications and citations
 */
@Component({
  selector: 'cde-source-data-menu',
  imports: [HraCommonModule, ButtonsModule, LinkDirective, PlainTooltipDirective, MatMenuModule],
  templateUrl: './source-data-menu.component.html',
  styleUrl: './source-data-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceDataMenuComponent {
  /** Publications to be displayed in the source data menu */
  readonly publications = input.required<PublicationItem[]>();
}
