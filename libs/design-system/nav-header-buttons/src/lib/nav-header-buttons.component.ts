import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

/** Variant of nav header button */
export type NavHeaderButtonsVariant = 'basic' | 'sidenav';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
@Component({
  selector: 'hra-nav-header-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    BrandMarkComponent,
    ButtonsModule,
    ProductLogoComponent,
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
}
