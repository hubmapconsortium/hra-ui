import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

@Directive({ selector: '[hraInfoButtonTagline]' })
export class InfoButtonTaglineDirective {}

@Directive({ selector: '[hraInfoButtonActions]' })
export class InfoButtonActionsDirective {}

/** Info Button Component */
@Component({
  selector: 'hra-info-button',
  imports: [MatIconModule, MatButtonModule, PlainTooltipDirective, RichTooltipModule],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent {}
