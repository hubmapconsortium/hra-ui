import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-download-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-state.component.html',
  styleUrls: ['./download-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadStateComponent {}
