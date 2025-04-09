import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HraCommonModule } from '@hra-ui/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ContentTemplatesModule } from '@hra-ui/design-system/content-templates';
import { Apps } from './types/app-cards.schema';
import { httpResource } from '@angular/common/http';

/** Injection token for the window object */
export const WINDOW = new InjectionToken<typeof window>('window', {
  providedIn: 'root',
  factory: () => window,
});

/** This component is used for rendering the landing page of the application. */
@Component({
  selector: 'hra-landing-page',
  imports: [CommonModule, HraCommonModule, MatButtonToggleModule, ButtonsModule, ContentTemplatesModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Global window object */
  private readonly window = inject(WINDOW);

  /** Resource for loading app data */
  protected readonly appsResource = httpResource<Apps>('/assets/apps.json');

  /** Currently selected tab name */
  protected readonly selectedTab = signal('Researcher Apps');

  /** Available tabs */
  protected readonly tabs = computed(() => this.appsResource.value()?.tabs ?? []);

  /** Tab names for toggle-button-group */
  protected readonly appsTitleOptions = computed(() => this.tabs().map((tab) => tab.name));

  /** Currently selected tab object */
  protected readonly currentTab = computed(() => this.tabs().find((tab) => tab.name === this.selectedTab()));

  /** Toggles tab selection */
  toggleSelection(tab: string): void {
    this.selectedTab.set(tab);
  }

  /** Open the app url */
  onOpenAppUrl(appUrl: string): void {
    this.window.open(appUrl, '_blank');
  }

  /** Open the documentation link */
  onOpenDocumentationLink(docLink: string): void {
    this.window.open(docLink, '_blank');
  }
}
