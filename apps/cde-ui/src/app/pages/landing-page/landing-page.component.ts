import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { ExampleListComponent, LandingExample } from '../../components/example-list/example-list.component';
import { LandingCard, LandingCardComponent } from '../../components/landing-card/landing-card.component';
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

  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /** Triggered when user clicks on the Copy button */
  openCopiedSnackbar(): void {
    this.snackbar.open('Copied to clipboard', '', false, 'start', { duration: 5000 });
  }

  /**
   * Collapse multiple spaces into a single space
   *
   * @param text Text to collapse consecutive spaces in
   * @returns Collapsed text
   */
  collapseSpaces(text: string): string {
    return text.replace(/\s+/g, ' ');
  }
}
