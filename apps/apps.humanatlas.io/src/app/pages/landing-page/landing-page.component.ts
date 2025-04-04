import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { UiSectionComponent } from '@hra-ui/design-system/ui-section';
import { RESEARCHER_APPS, DEVELOPER_APPS } from './static-data/parsed';

/** Injection token for the window object */
export const WINDOW = new InjectionToken<typeof window>('window', {
  providedIn: 'root',
  factory: () => window,
});

@Component({
  selector: 'hra-landing-page',
  imports: [CommonModule, MatButtonToggleModule, ButtonToggleSizeDirective, ButtonsModule, UiSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Window object */
  private readonly window = inject(WINDOW);

  protected readonly researcherApps = RESEARCHER_APPS;
  protected readonly developerApps = DEVELOPER_APPS;

  protected readonly researcherAppsTitle = 'Researcher Apps';
  protected readonly developerAppsTitle = 'Developer Apps';

  protected readonly toggleText = signal(this.researcherAppsTitle);
  protected readonly isResearcherApps = computed(() => this.toggleText() === this.researcherAppsTitle);

  protected readonly apps = computed(() => (this.isResearcherApps() ? this.researcherApps : this.developerApps));

  /** Open the app url */
  onOpenAppUrl(appUrl: string): void {
    this.window.open(appUrl, '_blank');
  }

  /** Open the documentation link */
  onOpenDocumentationLink(docLink: string): void {
    this.window.open(docLink, '_blank');
  }
}
