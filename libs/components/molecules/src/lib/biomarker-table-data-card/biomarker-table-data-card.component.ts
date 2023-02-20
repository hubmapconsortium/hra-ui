import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface DataItem {
  label: string;
  value: string;
}

export interface SectionItem {
  section: number;
  data: DataItem;
  isLastItem: boolean;
}

@Component({
  selector: 'hra-biomarker-table-data-card',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './biomarker-table-data-card.component.html',
  styleUrls: ['./biomarker-table-data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableDataCardComponent implements OnChanges {
  /* Input to get the list of data items */
  @Input() data: DataItem[][] = [];

  /* Converts nested array of DataItem into Flat array of SectionItem */
  sectionItems: SectionItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.updateSectionItems();
    }
  }

  /* Updates sectionItems array when data is changed */
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
