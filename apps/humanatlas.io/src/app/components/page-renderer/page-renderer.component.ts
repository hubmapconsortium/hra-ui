import { Component, Input } from '@angular/core';
import { PageDef } from '../page-element/page-def';

/** Displays elements on the page */
@Component({
  selector: 'ccf-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss'],
})
export class PageRendererComponent {
  /** Elements data to be displayed on the page */
  @Input() defs: PageDef[] = [];
}
