import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

export type AppLogosVariant = 'default' | 'fixed';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
@Component({
  selector: 'hra-app-logos',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './app-logos.component.html',
  styleUrl: './app-logos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.variant]': 'variant()',
    '[attr.no-description]': '!appDescription()',
  },
})
export class AppLogosComponent {
  /** Variant of logo component */
  readonly variant = input<AppLogosVariant>('default');

  /** Link to app home page */
  readonly appLink = input.required<string>();
  /** Src url for app icon */
  readonly appIcon = input.required<string>();
  /** App title */
  readonly appTitle = input.required<string>();
  /** Description of app */
  readonly appDescription = input<string>();
}
