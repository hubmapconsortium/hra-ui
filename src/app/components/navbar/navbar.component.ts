import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NavItems } from '../toolbar/nav-items';

@Component({
  selector: 'ccf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() items: NavItems[];
  @Output() itemClick = new EventEmitter<NavItems>;

  @ViewChild('childMenu')
  public childMenu: any;

  constructor() { }

}
