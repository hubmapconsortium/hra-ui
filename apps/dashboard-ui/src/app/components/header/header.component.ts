import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Header Component
 */
@Component({
  selector: 'hra-dashboard-header',
  imports: [HraCommonModule, RouterModule, MatMenuModule, MatIconModule, ButtonsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.menu-open]': 'menuOpen',
  },
})
export class HeaderComponent {
  /** Trigger for the menu */
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  /** Flag for menu status */
  menuOpen = false;

  /** Closes menu if open */
  closeMenu() {
    if (this.menuTrigger) {
      this.menuTrigger.closeMenu();
    }
  }
}
