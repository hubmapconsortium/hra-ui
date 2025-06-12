import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, linkedSignal } from '@angular/core';
import { assetsUrl, HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ContentTemplatesModule } from '@hra-ui/design-system/content-templates';
import AppCardsSchema from './types/app-cards.schema';
import { FormsModule } from '@angular/forms';

/** Injection token for the window object */
export const WINDOW = new InjectionToken<typeof window>('window', {
  providedIn: 'root',
  factory: () => window,
});

/** This component is used for rendering the landing page of the application. */
@Component({
  selector: 'hra-landing-page',
  imports: [FormsModule, HraCommonModule, ButtonsModule, ContentTemplatesModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Global window object */
  private readonly window = inject(WINDOW);

  /** Tabs data resource */
  private readonly tabsResource = httpResource(assetsUrl('assets/apps.json'), {
    parse: (data) => AppCardsSchema.parse(data).tabs,
    defaultValue: [],
  });

  /** Available tabs */
  protected readonly tabs = this.tabsResource.value;

  /** Active tab (undefined when tabs are empty) */
  protected readonly activeTab = linkedSignal(() => this.tabs().at(0));

  /** Active section items */
  protected readonly activeSections = computed(() => this.activeTab()?.sections ?? []);

  /** Open the app url */
  onOpenAppUrl(appUrl: string): void {
    this.window.open(appUrl, '_blank');
  }

  /** Open the documentation link */
  onOpenDocumentationLink(docLink: string): void {
    this.window.open(docLink, '_blank');
  }
}
