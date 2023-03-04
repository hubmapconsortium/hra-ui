import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-download-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadButtonComponent {}
