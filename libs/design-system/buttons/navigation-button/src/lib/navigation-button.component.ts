import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

/** Type for the navigation button variant */
export type NavigationButtonVariant = 'cta' | 'menu-item';

/**
 * Navigation button component for global navigation
 * Used in mega menus and mobile menu overlays
 */
@Component({
  selector: 'hra-navigation-button',
  imports: [HraCommonModule, MatRippleModule, MatIconModule],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-navigation-button-" + variant()',
    '[class.icon_alignment]': 'supportingText()',
  },
})
export class NavigationButtonComponent {
  /** Label text for the navigation item */
  readonly label = input.required<string>();

  /** Link URL for the navigation item */
  readonly link = input.required<string>();

  /** Variant type (cta or menu-item) */
  readonly variant = input<NavigationButtonVariant>('menu-item');

  /** Supporting text for additional description */
  readonly supportingText = input<string>();

  /** Whether to show leading icon */
  readonly showLeadingIcon = input<boolean>();

  /** Whether to show trailing icon */
  readonly showTrailingicon = input<boolean>();

  /** Whether to show indent */
  readonly showIndent = input<boolean>(false);
}
