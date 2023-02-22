import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

/** An item which defines a string label and a string value */
export interface DataItem {
  /** A string property that represents the label */
  label: string;
  /** A string property that represents the value */
  value: string;
}

/** An item which represents a section with a data item and an indicator for the last item in the section */
export interface SectionItem {
  /** A number property that represents the section number */
  section: number;
  /** A DateItem property that represents a section and its data */
  data: DataItem;
  /** A boolean property that represents the last item of a section */
  isLastItem: boolean;
}

/** This component displays a table with sections, where each section contains a list of items with a label and a value. */
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
        newSectionItems.push({
          data: item,
          section: index,
          isLastItem: index === section.length - 1,
        });
      });
    });

    this.sectionItems = newSectionItems;
  }
}
