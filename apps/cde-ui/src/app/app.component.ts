import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule } from '@hra-ui/common';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ThemePreference, ThemeService } from './services/theme-service/theme.service';

/** A choice in the header's theme menu */
interface ThemeOption {
  /** Theme menu choice */
  id: ThemePreference;
  /** Menu item label */
  label: string;
  /** Icon the theme menu button shows while this choice is on */
  icon: string;
}

/** Theme menu choices, matching the visualization toolbar's Theme menu */
const THEME_OPTIONS: ThemeOption[] = [
  { id: 'system', label: 'System settings', icon: 'brightness_4' },
  { id: 'light', label: 'Light theme', icon: 'light_mode' },
  { id: 'dark', label: 'Dark theme', icon: 'dark_mode' },
];

/** A link in the header's help menu */
interface HelpLink {
  /** Analytics feature id */
  id: string;
  /** Menu item label */
  label: string;
  /** Link url */
  url: string;
}

/** Help menu links, matching the visualization toolbar's Help menu, which cde-ui hides */
const HELP_LINKS: HelpLink[] = [
  { id: 'user-guide', label: 'User guide', url: 'https://humanatlas.io/user-story/5' },
  { id: 'github', label: 'Code on GitHub', url: 'https://github.com/hubmapconsortium/hra-ui/tree/main/apps/cde-ui' },
  {
    id: 'embedding-guide',
    label: 'Embedding guide',
    url: 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md',
  },
];

/**
 * App component for CDE
 */
@Component({
  selector: 'cde-ui',
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    NavigationModule,
    ButtonsModule,
    PlainTooltipDirective,
    MatMenuModule,
    CommonModule,
    HraCommonModule,
    LinkDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent extends BaseApplicationComponent {
  /** Light and dark theme switcher */
  protected readonly themeService = inject(ThemeService);

  /** Theme menu choices */
  protected readonly themeOptions = THEME_OPTIONS;

  /** Icon of the theme menu button, showing the current choice */
  protected readonly themeIcon = computed(
    () => THEME_OPTIONS.find((option) => option.id === this.themeService.preference())?.icon ?? 'brightness_4',
  );

  /** Help menu links */
  protected readonly helpLinks = HELP_LINKS;

  /** Initialize app */
  constructor() {
    // No app-wide screen size notice: the visualization switches to tabs on small screens,
    // and only the create page shows the notice
    super();

    inject(CustomScrollService);
    inject(Router).initialNavigation();

    // Anchors scroll to 24px below the 56px header
    const scroller = inject(ViewportScroller);
    scroller.setOffset([0, 56 + 24]);
  }
}
