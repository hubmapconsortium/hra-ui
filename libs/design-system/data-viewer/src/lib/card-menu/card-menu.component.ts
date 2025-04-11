import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { ViewerCardData } from '../types/data-viewer.schema';

/**
 * Menu to be used to download images and data in an individual viewer card
 */
@Component({
  selector: 'hra-card-menu',
  imports: [HraCommonModule, MatMenuModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMenuComponent {
  /** Reference to menu component */
  readonly menu = viewChild.required('menu', { read: MatMenu });

  /** Data viewer variant the card belongs to */
  readonly variant = input.required<ProductLogoId>();

  /** Viewer card data */
  readonly viewerCardData = input.required<ViewerCardData>();
}
