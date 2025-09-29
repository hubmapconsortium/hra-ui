import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ScrollingModule as HraScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';

/** Privacy category interface */
interface PrivacyCategory {
  isRequired?: boolean;
  id: string;
  title: string;
  description: string;
  expanded: boolean;
  enabled: boolean;
  privacyDetails?: string;
  providerName?: string;
  providerLink?: string;
}

/**
 * Privacy Preferences Modal Component
 */
@Component({
  selector: 'hra-privacy-preferences-modal',
  imports: [
    HraCommonModule,
    BrandModule,
    ButtonsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatSlideToggle,
    HraScrollingModule,
    ScrollOverflowFadeDirective,
    TextHyperlinkComponent,
  ],
  templateUrl: './privacy-preferences-modal.component.html',
  styleUrl: './privacy-preferences-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPreferencesModalComponent {
  /** Whether user has already provided preferences */
  readonly hasProvidedPreferences = input(false);

  /** Tab index */
  readonly tabIndex = model(0);

  /** Emitted when the "Allow necessary only" button is clicked */
  readonly allowNecessaryOnly = model(false);

  /** Emitted when the "Allow selection" button is clicked */
  readonly allowSelection = model(false);

  /** Emitted when the "Allow all" button is clicked */
  readonly allowAll = model(false);

  /** Emitted when the "close" button is clicked */
  readonly close = model(false);

  /** Privacy categories signal */
  readonly categories = signal<PrivacyCategory[]>([
    {
      id: 'necessary',
      title: 'Necessary',
      description:
        'Necessary cookies and similar technologies make websites usable by enabling basic functions like page navigation. The website cannot function properly without this feature.',
      expanded: false,
      enabled: true,
      isRequired: true,
      providerName: 'Human Reference Atlas',
      providerLink: 'https://humanatlas.io/privacy-policy',
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description:
        'Preference cookies remember your choices, like your preferred language or display settings. They help the site behave in a way that matches your preferences.',
      expanded: false,
      enabled: false,
      privacyDetails: 'We do not use cookies or technology of this type',
    },
    {
      id: 'statistics',
      title: 'Statistics',
      description:
        'We use statistics cookies and similar technologies to collect aggregated, anonymous data that help us understand traffic patterns, popular pages, and overall performance. This information supports continuous improvements to our website.',
      expanded: false,
      enabled: false,
      providerName: 'Human Reference Atlas',
      providerLink: 'https://humanatlas.io/privacy-policy',
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description:
        'These cookies are used by third-party services, such as YouTube, to enable embedded video playback. If these cookies are disabled, embedded videos will not play on this site.',
      expanded: false,
      enabled: false,
      providerName: 'YouTube',
      providerLink: 'https://policies.google.com/privacy',
    },
  ]);

  constructor() {
    this.tabIndex.set(this.hasProvidedPreferences() ? 1 : 0);
  }

  /** Expand category */
  expandCategory(id: string): void {
    this.categories.update((cats) => cats.map((cat) => (cat.id === id ? { ...cat, expanded: !cat.expanded } : cat)));
  }

  /** Toggle category enabled state */
  toggleEnabled(id: string, enabled: boolean): void {
    this.categories.update((cats) => cats.map((cat) => (cat.id === id && !cat.isRequired ? { ...cat, enabled } : cat)));
  }

  /** Disables all non-essential cookies and keeps necessary only */
  onAllowNecessaryOnly(): void {
    this.categories.update((cats) =>
      cats.map((cat) => ({
        ...cat,
        enabled: cat.isRequired ?? false,
      })),
    );
    this.allowNecessaryOnly.set(true);
  }

  /** Keeps currently selected cookies */
  onAllowSelection(): void {
    this.allowSelection.set(true);
  }

  /** Enables all cookies */
  onAllowAll(): void {
    this.categories.update((cats) => cats.map((cat) => ({ ...cat, enabled: true })));
    this.allowAll.set(true);
  }
}
