import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-simple-tile',
  templateUrl: './simple-tile.component.html',
  styleUrls: ['./simple-tile.component.scss']
})
export class SimpleTileComponent implements OnInit {

  public definition: any[] = [
    {lines: 'A Common Coordinate Framework (CCF) for a human body provides a unique address for each cell in the human body. It is similar to the latitude-longtitude system used to navigate a world map'},
    {lines: 'A Human Reference Atlas (HRA) is a comprehensive, high-resolution, three-dimensional atlas of all the cells in the healthy human body. The Human Reference Atlas provides standard terminologies and data structures for describing spicimens, biological structures, and spatial positions linked to existing ontologies'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
