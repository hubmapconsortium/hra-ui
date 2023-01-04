import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

export interface CellPopulationGraphs {
  headerCardData: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  buttonData: UseButton;
}

@Component({
  selector: 'cell-population-graphs',
  templateUrl: './cell-population-graphs.component.html',
  styleUrls: ['./cell-population-graphs.component.scss']
})
export class CellPopulationGraphsComponent {
  data = this.route.snapshot.data['content'] as CellPopulationGraphs;
  headerCardData = this.data.headerCardData;
  overviewData = this.data.overviewData;
  acknowledgmentsData = this.data.acknowledgmentsData;
  buttonData = this.data.buttonData;

  constructor(private readonly route: ActivatedRoute) { }
}
