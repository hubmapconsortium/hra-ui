import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * This is a responsive component is used in digital object viewer components. This card design was inspired by YouTube's Thumbnail component.
 */
@Component({
  selector: 'hra-viewer-card',
  imports: [HraCommonModule, MatMenuModule, MatIconModule, MatDividerModule, ButtonsModule],
  templateUrl: './viewer-card.component.html',
  styleUrl: './viewer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ViewerCardComponent {
  /** All available dropdown options */
  readonly variant = input.required<string>();

  /** Card tagline */
  readonly tagline = input<string>('Responsive Name of Digital Object');
}
