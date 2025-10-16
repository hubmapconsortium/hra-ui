import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

/** Tagline component for info button rich tooltip */
@Component({
  selector: 'hra-info-button-tooltip-tagline',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonTooltipTaglineComponent {}

/** Content component for info button rich tooltip */
@Component({
  selector: 'hra-info-button-tooltip-content',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonTooltipContentComponent {}

/** Info Button Component */
@Component({
  selector: 'hra-info-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, PlainTooltipDirective, RichTooltipModule],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent {}
