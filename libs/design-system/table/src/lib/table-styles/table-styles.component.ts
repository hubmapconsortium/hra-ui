import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies table styles globally
 */
@Component({
  selector: 'hra-table-styles',
  standalone: true,
  template: '',
  styleUrls: ['./table-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableStylesComponent {}
