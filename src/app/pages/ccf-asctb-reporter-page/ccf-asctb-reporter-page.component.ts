import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';

@Component({
  selector: 'asctb-reporter',
  templateUrl: './ccf-asctb-reporter-page.component.html',
  styleUrls: ['./ccf-asctb-reporter-page.component.scss']
})
export class CcfReporterPageComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  constructor(private readonly route: ActivatedRoute) { }
}
