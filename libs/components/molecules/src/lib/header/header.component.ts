import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { LinkDirective, EMPTY_LINK } from '@hra-ui/cdk';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Header component, displays on top of every page.
 */
@Component({
  selector: 'hra-header',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatRippleModule, LinkDirective],
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

  /** Input for Product Title link */
  @Input() productTitleLink = EMPTY_LINK;

  /** Input for about link */
  @Input() aboutLink = EMPTY_LINK;

  /** Input for HRA Portal link */
  @Input() hraPortal = EMPTY_LINK;

  /** Emits when the contact button is clicked */
  @Output() readonly contactClick = new EventEmitter<void>();

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * Logs event when about button clicked
   */
  aboutClicked(): void {
    this.ga.event('about_icon_click', 'link_click');
  }
}
