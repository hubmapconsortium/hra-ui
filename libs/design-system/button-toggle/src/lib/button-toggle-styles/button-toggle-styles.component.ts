import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies button toggle styles globally
 */
@Component({
  selector: 'hra-button-toggle-styles',
  standalone: true,
  template: '',
  styleUrls: ['./button-toggle-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleStylesComponent {}
