import { Component, Input, OnInit } from '@angular/core';
import { PageDef } from '../page-element/page-def';

@Component({
  selector: 'ccf-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss']
})
export class PageRendererComponent {
  @Input() defs: PageDef[] = [];
}
