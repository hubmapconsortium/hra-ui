import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

/**
 * Component
 */
@Component({
  selector: 'ccf-metadata-card',
  templateUrl: './metadata-card.component.html',
  styleUrls: ['./metadata-card.component.scss'],
  imports: [MatIconModule, MatButtonModule, ButtonsModule, MicroTooltipDirective],
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
