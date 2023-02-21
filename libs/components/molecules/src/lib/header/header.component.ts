import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Header component, displays on top of every page.
 */
@Component({
  selector: 'hra-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  /**
   * Input for product logo URL to displayed on the left side.
   */
  @Input() productLogoUrl = '';

  /**
   * Input for product title to displayed on the left side.
   */
  @Input() productTitle = '';

  /**
   * Input for app title to show on the left side.
   */
  @Input() appTitle = '';
}
