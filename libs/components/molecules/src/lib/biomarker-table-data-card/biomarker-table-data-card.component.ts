import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

/** Interface of DataItem which contains label and value */
export interface DataItem {
  label: string;
  value: string;
}

/** Interface that stores original DataItem along with its section and a boolean if it is the last item */
export interface SectionItem {
  section: number;
  data: DataItem;
  isLastItem: boolean;
}

/** This component shows a card with a table of biomarker data */
@Component({
  selector: 'hra-biomarker-table-data-card',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './biomarker-table-data-card.component.html',
  styleUrls: ['./biomarker-table-data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableDataCardComponent implements OnChanges {
  /** Nested list of DataItems for each section which is displayed to the user */
  @Input() data: DataItem[][] = [];

  /** Converted nested array of DataItem into Flat array of SectionItem */
  sectionItems: SectionItem[] = [];

  /** Triggers an update on sectionItems array when data is changed */
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.updateSectionItems();
    }
  }

  /** Updates sectionItems array when data is changed */
  private updateSectionItems(): void {
    const newSectionItems: SectionItem[] = [];

    this.data.forEach((section) => {
      section.forEach((item, index) => {
        newSectionItems.push(<SectionItem>{
          data: item,
          section: index,
          isLastItem: index == section.length - 1,
        });
      });
    });

    this.sectionItems = newSectionItems;
  }
}
