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
  tableRows: DataRow<DataCell>[];
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

  /** List of Biomarker tab which includes rows and columns of the table that is to be displayed */
  @Input() tabs: BiomarkerTab[] = [];

  /** The current selected tab from the cell types */
  activeTab = '';

  /** Indicates if the table is fully shown, defaults to false*/
  isTableFullScreen = false;

  /** Changes the selected tab when the user clicks on any other tab */
  ngOnChanges(changes: SimpleChanges): void {
    if ('tabs' in changes) {
      this.activeTab = this.tabs[0].label;
    }
  }
}
