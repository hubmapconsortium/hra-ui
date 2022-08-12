import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ccf-simple-tile',
  templateUrl: './simple-tile.component.html',
  styleUrls: ['./simple-tile.component.scss']
})
export class SimpleTileComponent {

  @Input()
  definitions: any[] = [];

  constructor() { }

}
