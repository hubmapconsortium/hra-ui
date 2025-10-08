import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { RichTooltipDirective } from '@hra-ui/design-system/tooltips/rich-tooltip';

@Component({
  selector: 'hra-info-button',
  imports: [MatIconModule, MatButtonModule, PlainTooltipDirective, RichTooltipDirective],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent {
  readonly richTooltipTagline = input.required<string>();

  readonly richTooltipDescription = input.required<string>();
}
