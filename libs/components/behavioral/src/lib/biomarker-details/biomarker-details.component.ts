import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BiomarkerTableDataCardComponent,
  SourceListComponent,
  DataItem,
  SourceListItem,
} from '@hra-ui/components/molecules';
import {
  LabelBoxComponent,
  GradientLegendComponent,
  SizeLegendComponent,
  GradientPoint,
  SizeLegend,
} from '@hra-ui/components/atoms';
import { BiomarkerTableComponent, DataRow, DataCell } from '@hra-ui/components/organisms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

export interface BiomarkerTab {
  label: string;
  tableData: DataRow<DataCell>[];
  tableColumns: string[];
}

/** The component displays the biomarker details which includes the details, gradient legends, size legends and source lists*/
@Component({
  selector: 'ftu-biomarker-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BiomarkerTableDataCardComponent,
    LabelBoxComponent,
    GradientLegendComponent,
    SizeLegendComponent,
    SourceListComponent,
    MatTabsModule,
    BiomarkerTableComponent,
  ],
  templateUrl: './biomarker-details.component.html',
  styleUrls: ['./biomarker-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerDetailsComponent implements OnChanges {
  /** Nested list of DataItems for each section which is displayed to the user */
  @Input() data: DataItem[][] = [];

  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Taking input for the radius of the circle and the label to be displayed. */
  @Input() sizes: SizeLegend[] = [];

  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceListItem[] = [];

  @Input() tableColumns: string[] = [];

  @Input() tableData: DataRow<DataCell>[] = [];

  @Input() links: BiomarkerTab[] = [];

  activeLink = '';

  ngOnChanges(changes: SimpleChanges): void {
    if ('links' in changes) {
      this.activeLink = this.links[0].label;
    }
  }
}
