import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** Global styles for text hyperlinks */
@Component({
  selector: 'hra-text-hyperlink-global-styles',
  standalone: true,
  template: '',
  styleUrls: ['./global-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextHyperlinkGlobalStylesComponent {}
