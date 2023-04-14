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
import { selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { ResourceIds as Ids, SourceListSelectors } from '@hra-ui/state';
import { HoverDirective } from '@hra-ui/cdk';

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
    HoverDirective,
  ],
  templateUrl: './biomarker-details.component.html',
  styleUrls: ['./biomarker-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerDetailsComponent implements OnChanges {
  /** Nested list of DataItems for each section which is displayed to the user */
  @Input() data: DataItem[][] = [];

  /** List of Biomarker tab which includes rows and columns of the table that is to be displayed */
  @Input() tabs: BiomarkerTab[] = [];

  /** Info to be shown on the tooltip for Gradient Legend */
  gradientHoverInfo = selectQuerySnapshot(RR.anyText, Ids.GradientLegendInfo);

  /** Info to be shown on the tooltip for Size Legend */
  sizeHoverInfo = selectQuerySnapshot(RR.anyText, Ids.SizeLegendInfo);

  /** The current selected tab from the cell types */
  activeTab = '';

  /** Indicates if the table is fully shown, defaults to false*/
  isTableFullScreen = false;

  /** Gradient colors along with their stop points */
  readonly gradient = selectQuerySnapshot(RR.query, Ids.GradientLegend, 'gradient');

  /** Taking input for the radius of the circle and the label to be displayed. */
  readonly size = selectQuerySnapshot(RR.query, Ids.SizeLegend, 'size');

  /** List of sources with titles and links displayed to the user */
  readonly source = selectSnapshot(SourceListSelectors.getSourceList);

  /** Getter for gradient points */
  get gradientPoints(): GradientPoint[] {
    return (this.gradient()?.['points'] ?? []) as GradientPoint[];
  }

  /** Getter for sizes */
  get sizes(): SizeLegend[] {
    return (this.size()?.['sizes'] ?? []) as SizeLegend[];
  }

  /** Changes the selected tab when the user clicks on any other tab */
  ngOnChanges(changes: SimpleChanges): void {
    if ('tabs' in changes) {
      this.activeTab = this.tabs[0].label;
    }
  }
}
