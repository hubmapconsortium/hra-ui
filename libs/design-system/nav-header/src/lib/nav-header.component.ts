import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { AppLogosComponent, AppLogosVariant } from '@hra-ui/design-system/app-logos';

/**
 * Navigation Header Component
 */
@Component({
  selector: 'hra-nav-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, AppLogosComponent, IconButtonSizeDirective],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderComponent {
  /** Variant of the header */
  readonly variant = input<AppLogosVariant>('default');
  /** Link to the app */
  readonly link = input.required<string>();
  /** Icon for the app */
  readonly icon = input.required<string>();
  /** Name of the app */
  readonly title = input.required<string>();
  /** Description of the app */
  readonly description = input<string>();
}
