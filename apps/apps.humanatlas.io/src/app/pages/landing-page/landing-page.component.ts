import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToggleButtonSizeDirective } from '@hra-ui/design-system/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'hra-landing-page',
  imports: [CommonModule, MatButtonToggleModule, ToggleButtonSizeDirective, ButtonsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  toggleText: 'Researcher Apps' | 'Developer Apps' = 'Researcher Apps';
}
