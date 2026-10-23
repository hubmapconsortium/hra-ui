import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { injectAssetUrlResolver } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { ExampleListComponent, LandingExample } from '../../components/example-list/example-list.component';
import { LandingCard, LandingCardComponent } from '../../components/landing-card/landing-card.component';
import { Theme, ThemeService } from '../../services/theme-service/theme.service';

/** Hero screenshot sizes, so the browser can pick one for the rendered width and pixel density */
const HERO_SCREENSHOTS = [
  { width: 540, src: 'assets/screenshots/large-intestine-visualization-540x316.webp' },
  { width: 720, src: 'assets/screenshots/large-intestine-visualization-720x422.webp' },
  { width: 1080, src: 'assets/screenshots/large-intestine-visualization-1080x633.webp' },
  { width: 1440, src: 'assets/screenshots/large-intestine-visualization-1440x844.webp' },
];

/** Hero background sizes by viewport width, largest first, so the first matching media query wins */
const HERO_BACKGROUND_SIZES = [
  { media: '(min-width: 1921px)', size: '2560x1440' },
  { media: '(min-width: 1441px)', size: '1920x1080' },
  { media: '(min-width: 1025px)', size: '1440x810' },
  { media: '(min-width: 641px)', size: '1280x720' },
];

/** Hero background size for phones and browsers without picture support */
const HERO_BACKGROUND_FALLBACK_SIZE = '960x540';

/**
 * Builds the path of a hero background image
 *
 * @param theme Theme the image is drawn for
 * @param size Image size, as width x height
 * @returns The image path
 */
function heroBackground(theme: Theme, size: string): string {
  return `assets/backgrounds/hero/hero-bg-${theme}-${size}.webp`;
}

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
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Example datasets */
  readonly examples = input<LandingExample[]>([]);

  /** Developer tools cards */
  readonly developerTools = input<LandingCard[]>([]);

  /** Whether the hero screenshot has loaded, so its entrance animation plays on the image itself */
  protected readonly heroImageLoaded = signal(false);

  /** Hero screenshot srcset with each size resolved against the asset location */
  protected readonly heroScreenshotSrcset = computed(() =>
    HERO_SCREENSHOTS.map(({ width, src }) => `${this.resolveAssetUrl(src)} ${width}w`).join(', '),
  );

  /** Hero screenshot for browsers without srcset support */
  protected readonly heroScreenshotFallback = 'assets/screenshots/large-intestine-visualization-1080x633.webp';

  /** Light or dark theme, which picks the hero background images */
  private readonly theme = inject(ThemeService).theme;

  /** Hero background sources for larger viewports, in the current theme */
  protected readonly heroBackgroundSources = computed(() =>
    HERO_BACKGROUND_SIZES.map(({ media, size }) => ({ media, src: heroBackground(this.theme(), size) })),
  );

  /** Hero background for phones and browsers without picture support, in the current theme */
  protected readonly heroBackgroundFallback = computed(() =>
    heroBackground(this.theme(), HERO_BACKGROUND_FALLBACK_SIZE),
  );

  /** Resolves asset paths the same way as the assetUrl pipe */
  private readonly resolveAssetUrl = injectAssetUrlResolver();

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
