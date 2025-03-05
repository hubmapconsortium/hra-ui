import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'ccf-metadata-card',
  templateUrl: './metadata-card.component.html',
  styleUrls: ['./metadata-card.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, ButtonsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataCardComponent {
  readonly tagline = input.required<string>();
  readonly label = input.required<string>();
  readonly label2 = input<string>();

  readonly toggleExpansion = output();
}
