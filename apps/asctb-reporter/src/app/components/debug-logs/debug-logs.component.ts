import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { Sheet } from '../../models/sheet.model';
import { Logs } from '../../models/ui.model';
import { SidenavHeaderModule } from '../sidenav-header/sidenav-header.module';
import { SidenavModule } from '../sidenav/sidenav.module';

@Component({
  selector: 'app-debug-logs',
  imports: [
    CommonModule,
    SidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavHeaderModule,
  ],
  templateUrl: './debug-logs.component.html',
  styleUrls: ['./debug-logs.component.scss'],
})
export class DebugLogsComponent {
  @Input() currentSheet!: Sheet;
  @Input() logs!: Logs;
  @Output() readonly closeDebug = new EventEmitter<void>();
}
