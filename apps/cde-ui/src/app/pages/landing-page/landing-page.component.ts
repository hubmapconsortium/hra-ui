import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  CollectionCard,
  CollectionCardActionComponent,
  CollectionCardComponent,
} from '@hra-ui/design-system/cards/collection-card';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
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
    CollectionCardComponent,
    CollectionCardActionComponent,
    CdkCopyToClipboard,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Visual cards to display on the landing page */
  readonly cards = input<CollectionCard[]>([]);

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
