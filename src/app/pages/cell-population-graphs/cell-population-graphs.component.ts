import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';

@Component({
  selector: 'cell-population-graphs',
  templateUrl: './cell-population-graphs.component.html',
  styleUrls: ['./cell-population-graphs.component.scss']
})
export class CellPopulationGraphsComponent {
  data = this.route.snapshot.data['content'] as PageDef[];

  constructor(private readonly route: ActivatedRoute) { }
}
