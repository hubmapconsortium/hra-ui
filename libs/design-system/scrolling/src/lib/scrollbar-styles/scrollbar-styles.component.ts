import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** ng-scrollbar global styles component */
@Component({
  selector: 'hra-scrollbar-styles',
  template: '',
  styleUrl: './scrollbar-styles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ScrollbarStylesComponent {}
