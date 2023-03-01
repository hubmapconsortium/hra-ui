import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
export interface SourceListItem {
  /** Title of the dataset in the SourceList */
  title: string;

  /** Link to the dataset in the SourceList */
  link: string;
}

/** This component shows list of sources with title and links to the datasets */
@Component({
  selector: 'hra-source-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceListItem[] = [];
}
