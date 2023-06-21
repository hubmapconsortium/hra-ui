import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';

@Component({
  selector: 'ccf-3d-reference-library',
  templateUrl: './three-dim-ref-page.component.html',
  styleUrls: ['./three-dim-ref-page.component.scss']
})
export class ThreeDimRefPageComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  constructor(private readonly route: ActivatedRoute) { }
}
