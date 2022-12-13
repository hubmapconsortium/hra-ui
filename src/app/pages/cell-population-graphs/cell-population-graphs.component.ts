import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';
import { acknowledgmentsData, buttonData, headerCardData, overviewData } from './cell.population-graphs.content';

@Component({
  selector: 'cell-population-graphs',
  templateUrl: './cell-population-graphs.component.html',
  styleUrls: ['./cell-population-graphs.component.scss']
})
export class CellPopulationGraphsComponent {

  constructor (private readonly route: ActivatedRoute){
    const data = route.snapshot.data['cellPopulationGraphs']
    this.headerCardData = data.headerCardData                  
    this.overviewData = data.overviewData                   
    this.acknowledgmentsData = data.acknowledgmentsData     
    this.buttonData = data.buttonData
  }
  headerCardData: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  buttonData: UseButton
}
