import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** Global styles for code blocks */
@Component({
  selector: 'hra-code-block-global-styles',
  standalone: true,
  template: '',
  styleUrls: ['./global-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockGlobalStylesComponent {}
