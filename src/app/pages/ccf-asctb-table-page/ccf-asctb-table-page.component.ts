import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';


@Component({
  selector: 'asctb-tables',
  templateUrl: './ccf-asctb-table-page.component.html',
  styleUrls: ['./ccf-asctb-table-page.component.scss']
})
export class CcfTablePageComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  constructor(private readonly route: ActivatedRoute) { }
}
