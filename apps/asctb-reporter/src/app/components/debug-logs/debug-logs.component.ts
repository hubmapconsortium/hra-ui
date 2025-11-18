import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { HraCommonModule } from '@hra-ui/common';
import { Sheet } from '../../models/sheet.model';
import { Logs } from '../../models/ui.model';
import { SidenavHeaderComponent } from '../sidenav-header/sidenav-header.component';
import { SidenavModule } from '../sidenav/sidenav.module';

@Component({
  selector: 'app-debug-logs',
  imports: [
    HraCommonModule,
    SidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavHeaderComponent,
  ],
  templateUrl: './debug-logs.component.html',
  styleUrls: ['./debug-logs.component.scss'],
})
export class DebugLogsComponent {
  readonly currentSheet = input.required<Sheet>();
  readonly logs = input.required<Logs>();
  readonly closeDebug = output<void>();
}
