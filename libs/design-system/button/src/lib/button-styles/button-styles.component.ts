import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies button styles globally
 */
@Component({
  selector: 'hra-button-styles',
  standalone: true,
  template: '',
  styleUrls: ['./button-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonStylesComponent {}
