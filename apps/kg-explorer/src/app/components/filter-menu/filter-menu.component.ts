import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';

import { FilterMenuOverlayComponent } from './filter-menu-overlay/filter-menu-overlay.component';

@Component({
  selector: 'hra-filter-menu',
  imports: [HraCommonModule, ButtonsModule, IconsModule, MatDividerModule, FilterMenuOverlayComponent],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closed]': 'drawerClosed',
  },
})
export class FilterMenuComponent {
  filterItems = [
    'Digital objects',
    'HRA release version',
    'Organs',
    'Anatomical structures',
    'Cell types',
    'Biomarkers',
  ];
  drawerClosed = false;

  readonly closeDrawer = output<boolean>();

  toggleDrawer() {
    this.drawerClosed = !this.drawerClosed;
    this.closeDrawer.emit(this.drawerClosed);
  }
}
