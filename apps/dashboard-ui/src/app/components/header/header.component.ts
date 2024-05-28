import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

/**
 * Header Component
 */
@Component({
  selector: 'hra-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.menu-open]': 'menuOpen',
  },
})
export class HeaderComponent {
  menuOpen = false;
}
