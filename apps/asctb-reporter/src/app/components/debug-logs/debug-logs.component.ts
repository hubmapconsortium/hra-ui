import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { Logs } from '../../models/ui.model';

@Component({
  selector: 'app-debug-logs',
  templateUrl: './debug-logs.component.html',
  styleUrls: ['./debug-logs.component.scss'],
  standalone: false,
})
export class DebugLogsComponent {
  @Input() currentSheet!: Sheet;
  @Input() logs!: Logs;
  @Output() readonly closeDebug = new EventEmitter<void>();
}
