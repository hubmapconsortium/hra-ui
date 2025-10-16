import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';
// import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconComponent } from '@hra-ui/design-system/icons';
import {
  SoftwareStatus,
  SoftwareStatusIndicatorComponent,
} from '@hra-ui/design-system/indicators/software-status-indicator';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/** Variant of nav header button */
export type NavHeaderButtonsVariant = 'basic' | 'sidenav';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
@Component({
  selector: 'hra-nav-header-buttons',
  imports: [
    HraCommonModule,
    BrandMarkComponent,
    ButtonsModule,
    CommonModule,
    IconComponent,
    MatButtonToggleModule,
    PlainTooltipDirective,
    SoftwareStatusIndicatorComponent,
  ],
  templateUrl: './nav-header-buttons.component.html',
  styleUrl: './nav-header-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderButtonsComponent {
  /** Variant of logo component */
  readonly variant = input<NavHeaderButtonsVariant>('basic');
  /** App software status */
  readonly appStatus = input<SoftwareStatus>();
  /** Whether to show the HRA brandmark */
  readonly brandmark = input<boolean>(true);
  /** Current app */
  readonly app = input.required<string>();
  /** Link to app home page */
  readonly appLink = input.required<string>();
  /** App title */
  readonly appTitle = input.required<string>();
  /** Tooltip displayed when user hovers over the HRA logo */
  readonly hraTooltip = input<string>();
}
