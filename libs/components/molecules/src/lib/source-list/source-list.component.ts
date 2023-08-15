import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LabelBoxComponent } from '@hra-ui/components/atoms';

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
export interface SourceListItem {
  /** Title of the dataset in the SourceList */
  title: string;

  /** Label of the dataset in the SourceList */
  label: string;

  /** Link to the dataset in the SourceList */
  link: string;
}

/** This component shows list of sources with title and links to the datasets */
@Component({
  selector: 'hra-source-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, LabelBoxComponent],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceListItem[] = [];
  /**
   * Show table of source list component which toggles to true or false
   * based on click
   */
  showTable = true;

  /**
   * It changes the value of showTable to false if value it true
   * and vice versa
   */
  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
