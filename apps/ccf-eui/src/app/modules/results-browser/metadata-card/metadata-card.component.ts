import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';

@Component({
  selector: 'ccf-metadata-card',
  templateUrl: './metadata-card.component.html',
  styleUrls: ['./metadata-card.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataCardComponent {
  readonly tagline = input.required<string>();
  readonly label = input.required<string>();
  readonly label2 = input<string>();
}
