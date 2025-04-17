import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { SnackbarService } from '@hra-ui/design-system/snackbar';

/** Embed Sidenav Content Component */
@Component({
  selector: 'hra-embed-sidenav-content',
  standalone: true,
  imports: [CommonModule, ClipboardModule, MatTabsModule, ButtonsModule, CodeBlockComponent, FlatCardModule],
  templateUrl: './embed-sidenav-content.component.html',
  styleUrl: './embed-sidenav-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbedSidenavContentComponent {
  /** Tagline of embed sidenav content component*/
  readonly tagline = input.required<string>();
  /** Code of embed sidenav content component*/
  readonly code = input.required<string>();
  /** Whether to show tabs for Embed and Use App iframe */
  readonly showApp = input.required<boolean>();
  /** Tab index */
  readonly tabIndex = model(0);
  /** Document link for the Documentation */
  readonly documentLink = input<string>();

  /** Sanitizer service */
  private readonly sanitizer = inject(DomSanitizer);

  private readonly snackbar = inject(SnackbarService);

  /** Emits true when close button is clicked */
  readonly closeSidenav = output();

  /** Sanitized app source document for iframe*/
  protected readonly appSrcDoc = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.code()));

  /** Trigerred when user clicks on the Documentation button */
  openDocumentLink() {
    window.open(this.documentLink(), '_blank');
  }

  openSnackbar() {
    this.snackbar.open('Copied to clipboard', '', false, 'start', { duration: 5000 });
  }
}
