import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { RESEARCHER_CONSTRUCT_APPS, RESEARCHER_USE_APPS, DEVELOPER_APPS } from './static-data/parsed';
import { UiSectionComponent } from '@hra-ui/design-system/ui-section';
import { Breakpoints, watchBreakpoint } from '@hra-ui/cdk/breakpoints';

@Component({
  selector: 'hra-landing-page',
  imports: [CommonModule, MatButtonToggleModule, ButtonToggleSizeDirective, ButtonsModule, UiSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  protected readonly researcherUseApps = RESEARCHER_USE_APPS;
  protected readonly researcherConstructApps = RESEARCHER_CONSTRUCT_APPS;
  protected readonly developerApps = DEVELOPER_APPS;
  protected readonly toggleText = signal('Researcher Apps');
  protected readonly apps = computed(() =>
    this.toggleText() === 'Researcher Apps' ? this.researcherUseApps : this.developerApps,
  );
  protected readonly isMobile = watchBreakpoint(Breakpoints.Mobile);
  protected readonly isDesktop = watchBreakpoint(Breakpoints.Desktop);

  toggleApps() {
    this.toggleText.set(this.toggleText() === 'Researcher Apps' ? 'Developer Apps' : 'Researcher Apps');
  }
}
