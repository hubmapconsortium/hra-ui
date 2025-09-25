import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Component
 */
@Component({
  selector: 'ccf-metadata-card',
  templateUrl: './metadata-card.component.html',
  styleUrls: ['./metadata-card.component.scss'],
  imports: [HraCommonModule, MatIconModule, MatButtonModule, ButtonsModule, PlainTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataCardComponent {
  /** Card title */
  readonly tagline = input.required<string>();
  /** Card description */
  readonly label = input.required<string>();
  /** Second line of description (optional) */
  readonly label2 = input<string>();
  /** Link to source data */
  readonly menuLink = input<string | undefined>();

  /** Toggles expansion of card */
  readonly toggleExpansion = output();
}
