import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-source-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent {}
