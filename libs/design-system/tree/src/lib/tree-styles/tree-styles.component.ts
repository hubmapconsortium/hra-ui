import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies mat tree styles globally
 */
@Component({
  selector: 'hra-tree-styles',
  template: '',
  styleUrl: './tree-styles.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeStylesComponent {}
