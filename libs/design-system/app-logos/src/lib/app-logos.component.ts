import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { BrandmarkComponent } from '@hra-ui/design-system/brandmark';
import { ButtonModule, ButtonSizeDirective, NavigationCategoryButtonDirective } from '@hra-ui/design-system/button';

export type AppLogosVariant = 'basic' | 'sidenav';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
@Component({
  selector: 'hra-app-logos',
  standalone: true,
  imports: [
    CommonModule,
    AssetUrlPipe,
    BrandmarkComponent,
    NavigationCategoryButtonDirective,
    ButtonSizeDirective,
    ButtonModule,
  ],
  templateUrl: './app-logos.component.html',
  styleUrl: './app-logos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLogosComponent {
  /** Variant of logo component */
  readonly variant = input<AppLogosVariant>('basic');

  readonly appStatus = input<string>();

  readonly brandmark = input<boolean>(true);

  /** Link to app home page */
  readonly appLink = input.required<string>();
  /** Src url for app icon */
  readonly appIcon = input.required<string>();
  /** App title */
  readonly appTitle = input.required<string>();
}
