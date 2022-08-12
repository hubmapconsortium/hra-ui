import { Component, Input, OnInit } from '@angular/core';
import { PageDataItems } from './page-data';

@Component({
  selector: 'ccf-page-data',
  templateUrl: './page-data.component.html',
  styleUrls: ['./page-data.component.scss']
})
export class PageDataComponent {

  @Input()
  public data: PageDataItems[] = []

  constructor() { }
}