import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

@Component({
  selector: 'app-sidenav-header',
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule, MatDividerModule, PlainTooltipDirective],
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss'],
})
export class SidenavHeaderComponent {
  @Input() title = '';
  @Input() download = false;
  @Input() tooltipString = 'Hello';
  @Output() readonly closeSideNav = new EventEmitter<void>();
  @Output() readonly downloadFn = new EventEmitter<void>();
}
