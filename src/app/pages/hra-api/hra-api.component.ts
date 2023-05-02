import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
 
@Component({
  selector: 'ccf-hra-api',
  templateUrl: './hra-api.component.html',
  styleUrls: ['./hra-api.component.scss']
})
export class HraApiComponent {

  constructor(private readonly route: ActivatedRoute) { }
  data = this.route.snapshot.data['content'] as PageDef[];
}
