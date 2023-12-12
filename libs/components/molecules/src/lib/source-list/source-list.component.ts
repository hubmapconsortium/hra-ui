import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EmptyBiomarkerComponent, LabelBoxComponent } from '@hra-ui/components/atoms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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
  imports: [CommonModule, MatTableModule, MatIconModule, LabelBoxComponent, EmptyBiomarkerComponent],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceListItem[] = [];
  /**
   * Input  buttonon text of empty biomarker component.
   */
  @Input() collaborateText = '';

  /**
   * Input  message markdown of empty biomarker component.
   */
  @Input() message = '';
  /**
   * Show table of source list component which toggles to true or false
   * based on click
   */
  showTable = true;

  /** Emits when the contact button is clicked */
  @Output() readonly collaborateClick = new EventEmitter<void>();

  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * It changes the value of showTable to false if value it true
   * and vice versa
   */
  toggleTable(): void {
    this.showTable = !this.showTable;
    console.warn('source_table_toggle', this.showTable.toString());
    this.ga.event('source_table_toggle', this.showTable.toString());
  }

  sourceLinkClicked(item: SourceListItem): void {
    console.warn('source_link_clicked', item.label, item.link);
    this.ga.event('source_link_clicked', item.label, item.link);
  }
}
