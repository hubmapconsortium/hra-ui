import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { RichTooltipDirective, RichTooltipContainerComponent } from '@hra-ui/design-system/tooltips/rich-tooltip';

/** Info Button Component */
@Component({
  selector: 'hra-info-button',
  imports: [MatIconModule, MatButtonModule, PlainTooltipDirective, RichTooltipDirective],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent {
  /** Custom rich tooltip container for advanced usage with action buttons */
  readonly richTooltipContent = input<RichTooltipContainerComponent>();

  /** Tagline for simple rich tooltip variant */
  readonly richTooltipTagline = input<string>('');

  /** Description for simple rich tooltip variant */
  readonly richTooltipDescription = input<string>('');
}
