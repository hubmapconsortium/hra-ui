import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Help button component that renders either a link or menu trigger
 */
@Component({
  selector: 'hra-help-button',
  imports: [MatIconModule, PlainTooltipDirective, MatMenuModule, ButtonsModule],
  templateUrl: './help-button.component.html',
  styleUrl: './help-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpButtonComponent {
  /** Action for the button - URL string for link or MatMenuPanel for menu */
  readonly action = input.required<string | MatMenuPanel>();
}
