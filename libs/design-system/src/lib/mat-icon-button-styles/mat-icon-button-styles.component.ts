import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies mat icon button styles globally
 */
@Component({
  selector: 'hra-mat-icon-button-styles',
  standalone: true,
  template: '',
  styleUrls: ['./mat-icon-button-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatIconButtonStylesComponent {}
