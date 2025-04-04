import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { UiSectionComponent } from '@hra-ui/design-system/ui-section';
import { RESEARCHER_APPS, DEVELOPER_APPS } from './static-data/parsed';

@Component({
  selector: 'hra-landing-page',
  imports: [CommonModule, MatButtonToggleModule, ButtonToggleSizeDirective, ButtonsModule, UiSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  protected readonly researcherApps = RESEARCHER_APPS;
  protected readonly developerApps = DEVELOPER_APPS;

  protected readonly researcherAppsTitle = 'Researcher Apps';
  protected readonly developerAppsTitle = 'Developer Apps';

  protected readonly toggleText = signal(this.researcherAppsTitle);
  protected readonly isResearcherApps = computed(() => this.toggleText() === this.researcherAppsTitle);

  protected readonly apps = computed(() => (this.isResearcherApps() ? this.researcherApps : this.developerApps));
}
