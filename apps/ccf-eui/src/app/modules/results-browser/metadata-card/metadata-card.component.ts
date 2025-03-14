import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

@Component({
  selector: 'ccf-metadata-card',
  templateUrl: './metadata-card.component.html',
  styleUrls: ['./metadata-card.component.scss'],
  imports: [MatIconModule, MatButtonModule, ButtonsModule, MicroTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataCardComponent {
  readonly tagline = input.required<string>();
  readonly label = input.required<string>();
  readonly label2 = input<string>();

  readonly toggleExpansion = output();
  readonly menuLink = input<string | undefined>();
}
