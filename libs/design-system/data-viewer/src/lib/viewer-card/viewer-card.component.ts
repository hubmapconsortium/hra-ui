import '@google/model-viewer';

import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { CardMenuComponent } from '../card-menu/card-menu.component';
import { ViewerCard } from '../types/data-viewer.schema';

/**
 * This is a responsive component used in digital object viewer components. This card design was inspired by YouTube's Thumbnail component.
 */
@Component({
  selector: 'hra-viewer-card',
  imports: [HraCommonModule, MatMenuModule, MatIconModule, MatDividerModule, ButtonsModule, CardMenuComponent],
  templateUrl: './viewer-card.component.html',
  styleUrl: './viewer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewerCardComponent {
  /** Mat dialog service */
  private readonly dialog = inject(MatDialog);

  /** Data viewer variant the card belongs to */
  readonly variant = input.required<ProductLogoId>();

  /** Viewer card data */
  readonly viewerCardData = input.required<ViewerCard>();

  /** Opens a full screen modal for a FTU illustration */
  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, {
      panelClass: 'viewer-card-modal',
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
    });
  }

  /** Closes the full screen modal */
  close(): void {
    this.dialog.closeAll();
  }
}
