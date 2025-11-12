import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** ng-scrollbar global styles component */
@Component({
  selector: 'hra-scrollbar-styles',
  template: '',
  styleUrl: './scrollbar-styles.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarStylesComponent {}
