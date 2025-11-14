import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies mat tree styles globally
 */
@Component({
  selector: 'hra-tree-styles',
  template: '',
  styleUrl: './tree-styles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TreeStylesComponent {}
