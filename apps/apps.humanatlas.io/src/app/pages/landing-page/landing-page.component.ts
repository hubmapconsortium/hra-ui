import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToggleButtonSizeDirective } from '@hra-ui/design-system/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { APPS } from './static-data/parsed';
import { UiSectionComponent } from '@hra-ui/design-system/ui-section';

@Component({
  selector: 'hra-landing-page',
  imports: [CommonModule, MatButtonToggleModule, ToggleButtonSizeDirective, ButtonsModule, UiSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  toggleText: 'Researcher Apps' | 'Developer Apps' = 'Researcher Apps';
  protected readonly apps = APPS;
}
