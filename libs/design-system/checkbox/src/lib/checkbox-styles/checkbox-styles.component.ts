import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies checkbox styles globally
 */
@Component({
  selector: 'hra-checkbox-styles',
  standalone: true,
  template: '',
  styleUrls: ['./checkbox-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxStylesComponent {}
