import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

/**
 * Header Component
 */
@Component({
  selector: 'hra-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatMenuModule, MatIconModule, AssetUrlPipe],
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
