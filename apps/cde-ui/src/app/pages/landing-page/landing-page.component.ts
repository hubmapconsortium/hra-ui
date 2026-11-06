import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { IMAGE_LOADER, ImageLoader, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { injectAssetUrlResolver } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { ExampleItem, ExampleListComponent } from '../../components/example-list/example-list.component';
import { LandingCard, LandingCardComponent } from '../../components/landing-card/landing-card.component';

/** Hero screenshot files by srcset width */
const HERO_SCREENSHOTS: Record<number, string> = {
  540: 'assets/screenshots/large-intestine-visualization-540x316.webp',
  720: 'assets/screenshots/large-intestine-visualization-720x422.webp',
  1080: 'assets/screenshots/large-intestine-visualization-1080x633.webp',
  1440: 'assets/screenshots/large-intestine-visualization-1440x844.webp',
};

/** Hero background sizes by viewport width, largest first, so the first matching media query wins */
const HERO_BACKGROUND_SOURCES = [
  { media: '(min-width: 1921px)', src: 'assets/backgrounds/hero/hero-bg-light-2560x1440.webp' },
  { media: '(min-width: 1441px)', src: 'assets/backgrounds/hero/hero-bg-light-1920x1080.webp' },
  { media: '(min-width: 1025px)', src: 'assets/backgrounds/hero/hero-bg-light-1440x810.webp' },
  { media: '(min-width: 641px)', src: 'assets/backgrounds/hero/hero-bg-light-1280x720.webp' },
];

/**
 * Landing Page Component
 */
@Component({
  selector: 'cde-landing-page',
  imports: [
    HraCommonModule,
    MatIconModule,
    ButtonsModule,
    NavigationModule,
    LinkDirective,
    IconsModule,
    ExampleListComponent,
    LandingCardComponent,
    CdkCopyToClipboard,
    NgOptimizedImage,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  providers: [
    {
      provide: IMAGE_LOADER,
      useFactory: (): ImageLoader => {
        const resolveAssetUrl = injectAssetUrlResolver();
        return ({ src, width }) => resolveAssetUrl((width && HERO_SCREENSHOTS[width]) || src);
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Example datasets */
  readonly examples = input<ExampleItem[]>([]);

  /** Developer tools cards */
  readonly developerTools = input<LandingCard[]>([]);

  /** Whether the hero screenshot has loaded, so its entrance animation plays on the image itself */
  protected readonly heroImageLoaded = signal(false);

  /** Hero background sources for larger viewports */
  protected readonly heroBackgroundSources = HERO_BACKGROUND_SOURCES;

  /** Hero background for phones and browsers without picture support */
  protected readonly heroBackgroundFallback = 'assets/backgrounds/hero/hero-bg-light-960x540.webp';

  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /** Triggered when user clicks on the Copy button */
  openCopiedSnackbar(): void {
    this.snackbar.open('Copied to clipboard', '', false, 'start', { duration: 5000 });
  }

  /**
   * Collapse multiple spaces into a single space and trim the ends
   *
   * @param text Text to collapse consecutive spaces in
   * @returns Collapsed text
   */
  collapseSpaces(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }
}
