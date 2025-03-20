import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss'],
  standalone: false,
})
export class SidenavHeaderComponent {
  @Input() title = '';
  @Input() download = false;
  @Input() tooltipString = 'Hello';
  @Output() readonly closeSideNav = new EventEmitter<void>();
  @Output() readonly downloadFn = new EventEmitter<void>();
}
