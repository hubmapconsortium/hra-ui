import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from '../page-element/page-def';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  constructor(private readonly route: ActivatedRoute) { }

  data = this.route.snapshot.data['content'] as PageDef[];
}
