import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { AppLogosComponent, AppLogosVariant } from '../../../logos/apps/src/index';

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
  variant = input<AppLogosVariant>();
  /** Link to the app */
  link = input.required<string>();
  /** Icon for the app */
  icon = input.required<string>();
  /** Name of the app */
  title = input.required<string>();
  /** Description of the app */
  description = input<string>();
}
