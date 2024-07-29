import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

export type LogosAppsVariant = 'default' | 'fixed';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
@Component({
  selector: 'hra-logos-apps',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.variant]': 'variant()',
    '[attr.no-description]': '!appDescription()',
  },
})
export class LogoComponent {
  /** Variant of logo component */
  readonly variant = input<LogosAppsVariant>('default');

  /** Link to app home page */
  readonly appLink = input.required<string>();
  /** Src url for app icon */
  readonly appIcon = input.required<string>();
  /** App title */
  readonly appTitle = input.required<string>();
  /** Description of app */
  readonly appDescription = input<string>();
}
