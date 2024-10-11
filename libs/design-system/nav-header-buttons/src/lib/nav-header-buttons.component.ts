import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { BrandmarkComponent } from '@hra-ui/design-system/brandmark';
import { ButtonModule, ButtonSizeDirective, NavigationCategoryButtonDirective } from '@hra-ui/design-system/button';
import { ProductLogoComponent, ProductName } from '@hra-ui/design-system/product-logo';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

export type NavHeaderButtonsVariant = 'basic' | 'sidenav';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
@Component({
  selector: 'hra-nav-header-buttons',
  standalone: true,
  imports: [
    CommonModule,
    AssetUrlPipe,
    BrandmarkComponent,
    NavigationCategoryButtonDirective,
    ButtonSizeDirective,
    ButtonModule,
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

  readonly appStatus = input<SoftwareStatus>();

  readonly brandmark = input<boolean>(true);

  /** Current app */
  readonly app = input.required<ProductName>();
  /** Link to app home page */
  readonly appLink = input.required<string>();
  /** App title */
  readonly appTitle = input.required<string>();
}
