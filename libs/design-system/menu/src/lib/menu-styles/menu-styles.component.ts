import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies menu styles globally
 */
@Component({
  selector: 'hra-menu-styles',
  standalone: true,
  template: '',
  styleUrls: ['./menu-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuStylesComponent {}
