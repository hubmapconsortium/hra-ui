import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';


@Component({
  selector: 'cell-population-graphs',
  templateUrl: './cell-population-graphs.component.html',
  styleUrls: ['./cell-population-graphs.component.scss']
})
export class CellPopulationGraphsComponent {
  headerCardData: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  buttonData: UseButton;

  constructor (route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.headerCardData = data.headerCardData;
    this.overviewData = data.overviewData;
    this.acknowledgmentsData = data.acknowledgmentsData;
    this.buttonData = data.buttonData;
  }
}
