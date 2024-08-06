import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies mat icon button styles globally
 */
@Component({
  selector: 'hra-icon-button-styles',
  standalone: true,
  template: '',
  styleUrls: ['./icon-button-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonStylesComponent {}
