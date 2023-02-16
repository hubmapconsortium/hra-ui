import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

export interface SourceListItem {
  title: string;
  link: string;
}

@Component({
  selector: 'hra-source-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatTableModule],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent {
  @Input() sources: SourceListItem[] = [];
}
