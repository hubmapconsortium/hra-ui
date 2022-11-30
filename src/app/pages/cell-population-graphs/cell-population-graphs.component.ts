import { Component } from '@angular/core';
import { acknowledgmentsData, buttonData, headerCardData, overviewData } from './cell.population-graphs.content';

@Component({
  selector: 'cell-population-graphs',
  templateUrl: './cell-population-graphs.component.html',
  styleUrls: ['./cell-population-graphs.component.scss']
})
export class CellPopulationGraphsComponent {
  headerCardData = headerCardData;
  overviewData = overviewData
  acknowledgmentsData = acknowledgmentsData
  buttonData = buttonData
}
