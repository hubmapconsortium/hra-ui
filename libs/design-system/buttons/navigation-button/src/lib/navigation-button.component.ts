import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { HraCommonModule } from '@hra-ui/common';

/** Type for the navigation button variant */
export type NavigationButtonVariant = 'cta' | 'basic';

/**
 * Navigation button component for global navigation
 * Used in mega menus and mobile menu overlays
 */
@Component({
  selector: 'hra-navigation-button',
  imports: [HraCommonModule, MatRippleModule],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-navigation-button-" + variant()',
  },
})
export class NavigationButtonComponent {
  /** Link URL for the navigation item */
  readonly link = input.required<string>();

  /** Variant type (cta or menu-item) */
  readonly variant = input<NavigationButtonVariant>('basic');

  /** Whether to show indent instead */
  readonly indented = input(false, { transform: booleanAttribute });
}
