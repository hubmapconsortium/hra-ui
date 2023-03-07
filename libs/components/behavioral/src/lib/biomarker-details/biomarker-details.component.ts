import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiomarkerTableDataCardComponent } from '@hra-ui/components/molecules';
import { LabelBoxComponent } from '@hra-ui/components/atoms';
import { GradientLegendComponent } from '@hra-ui/components/atoms';
import { SizeLegendComponent } from '@hra-ui/components/atoms';
import { SourceListComponent } from '@hra-ui/components/molecules';
import { DataItem } from '@hra-ui/components/molecules';
import { GradientPoint } from '@hra-ui/components/atoms';
import { SizeLegend } from '@hra-ui/components/atoms';
import { SourceListItem } from '@hra-ui/components/molecules';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'ftu-biomarker-details',
  standalone: true,
  imports: [
    CommonModule,
    BiomarkerTableDataCardComponent,
    LabelBoxComponent,
    GradientLegendComponent,
    SizeLegendComponent,
    SourceListComponent,
    MatTabsModule,
  ],
  templateUrl: './biomarker-details.component.html',
  styleUrls: ['./biomarker-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerDetailsComponent {
  /** Nested list of DataItems for each section which is displayed to the user */
  @Input() data: DataItem[][] = [];

  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Taking input for the radius of the circle and the label to be displayed. */
  @Input() sizes: SizeLegend[] = [];

  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceListItem[] = [];
}
