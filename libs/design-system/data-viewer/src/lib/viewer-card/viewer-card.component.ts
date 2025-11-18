import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import '@google/model-viewer';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { CardMenuComponent } from '../card-menu/card-menu.component';
import { DataViewerVariant, ViewerCard } from '../types/data-viewer.schema';

/**
 * This is a responsive component used in digital object viewer components. This card design was inspired by YouTube's Thumbnail component.
 */
@Component({
  selector: 'hra-viewer-card',
  imports: [
    HraCommonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    ButtonsModule,
    CardMenuComponent,
    PlainTooltipDirective,
    MatDialogModule,
  ],
  templateUrl: './viewer-card.component.html',
  styleUrl: './viewer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewerCardComponent {
  /** Data viewer variant the card belongs to */
  readonly variant = input.required<DataViewerVariant>();

  /** Viewer card data */
  readonly viewerCardData = input.required<ViewerCard>();

  /** Alt text for the image/model */
  protected readonly alt = computed(() => {
    const data = this.viewerCardData();
    return data.alt ?? `${this.variant() === 'ftu' ? 'Image' : 'Model'} of "${data.label}"`;
  });

  /** Mat dialog service */
  private readonly dialog = inject(MatDialog);

  /** Reference to the fullscreen modal */
  private fullscreenRef?: MatDialogRef<unknown> = undefined;

  /** Opens a full screen modal for a FTU illustration */
  openImageViewer(content: TemplateRef<unknown>): void {
    if (!this.fullscreenRef) {
      this.fullscreenRef = this.dialog.open(content, {
        panelClass: 'viewer-card-modal',
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        autoFocus: '.close',
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
      });

      this.fullscreenRef.afterClosed().subscribe(() => {
        this.fullscreenRef = undefined;
      });
    }
  }

  /** Closes the full screen modal */
  close(): void {
    this.fullscreenRef?.close();
  }
}
