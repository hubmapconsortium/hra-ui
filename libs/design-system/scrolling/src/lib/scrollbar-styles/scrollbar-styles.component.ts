import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** ng-scrollbar global styles component */
@Component({
  selector: 'hra-scrollbar-styles',
  standalone: true,
  template: '',
  styleUrls: ['./scrollbar-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarStylesComponent {}
