import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies select styles globally
 */
@Component({
  selector: 'hra-select-styles',
  standalone: true,
  template: '',
  styleUrls: ['./select-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStylesComponent {}
