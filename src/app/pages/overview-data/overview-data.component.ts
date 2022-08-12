import { TILE_DEFINITION } from './../../shared/simple-tile-items';
import { Component, OnInit } from '@angular/core';
import { longButtonItems, pageTitle } from './overview-data.content';

@Component({
  selector: 'ccf-overview-data',
  templateUrl: './overview-data.component.html',
  styleUrls: ['./overview-data.component.scss']
})
export class OverviewDataComponent{

  pageTitle= pageTitle;

  description = TILE_DEFINITION

  longButtonItems = longButtonItems

  constructor() { }
}
