import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HubmapNavItems } from './hubmap-nav';

/**
 * Hubmap Navigation Component
 */
@Component({
  selector: 'hubmap-nav',
  templateUrl: './hubmap-nav.component.html',
  styleUrl: './hubmap-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubmapNavComponent {
  /** Navigation Menu Items */
  navItems = input<HubmapNavItems[]>();
}
