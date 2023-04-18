import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { HoverDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import {
  GradientLegendComponent,
  GradientPoint,
  LabelBoxComponent,
  SizeLegend,
  SizeLegendComponent,
} from '@hra-ui/components/atoms';
import { BiomarkerTableDataCardComponent, DataItem, SourceListComponent } from '@hra-ui/components/molecules';
import { BiomarkerTableComponent, DataCell, DataRow } from '@hra-ui/components/organisms';
import { ResourceIds as Ids, ResourceTypes as RTypes, SourceListSelectors } from '@hra-ui/state';

/** Tab data */
export interface BiomarkerTab {
  /** Tab label */
  label: string;
  /** Table rows */
  tableRows: DataRow<DataCell>[];
  /** Table column labels */
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
  readonly gradientHoverInfo = selectQuerySnapshot(RR.anyText, Ids.GradientLegendInfo);

  /** Info to be shown on the tooltip for Size Legend */
  readonly sizeHoverInfo = selectQuerySnapshot(RR.anyText, Ids.SizeLegendInfo);

  /** The current selected tab from the cell types */
  activeTab = '';

  /** Indicates if the table is fully shown, defaults to false*/
  isTableFullScreen = false;

  /** Gradient colors along with their stop points */
  readonly gradients = selectQuerySnapshot(RR.field, Ids.GradientLegend, RTypes.Gradient, 'points' as const, [])<
    GradientPoint[]
  >;

  /** Taking input for the radius of the circle and the label to be displayed. */
  readonly sizes = selectQuerySnapshot(RR.field, Ids.SizeLegend, RTypes.Size, 'sizes' as const, [])<SizeLegend[]>;

  /** List of sources with titles and links displayed to the user */
  readonly source = selectSnapshot(SourceListSelectors.getSourceList);

  /** Changes the selected tab when the user clicks on any other tab */
  ngOnChanges(changes: SimpleChanges): void {
    if ('tabs' in changes) {
      this.activeTab = this.tabs[0].label;
    }
  }
}
