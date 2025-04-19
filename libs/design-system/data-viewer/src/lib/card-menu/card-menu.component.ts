import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { ViewerCard } from '../types/data-viewer.schema';

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

  /** Viewer card data */
  readonly card = input.required<ViewerCard>();
}
