import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { HoverDirective } from '@hra-ui/cdk';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import {
  EmptyBiomarkerComponent,
  GradientLegendComponent,
  GradientPoint,
  LabelBoxComponent,
  SizeLegend,
  SizeLegendComponent,
} from '@hra-ui/components/atoms';
import { BiomarkerTableDataCardComponent, SourceListComponent, SourceListItem } from '@hra-ui/components/molecules';
import { BiomarkerTableComponent, TissueInfo } from '@hra-ui/components/organisms';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  CellSummaryActions,
  CellSummarySelectors,
  ResourceIds as Ids,
  IllustratorActions,
  IllustratorSelectors,
  ResourceTypes as RTypes,
  ScreenModeAction,
  SourceRefsSelectors,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { FtuDataService } from '@hra-ui/services';
import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';

/**
 * PlaceHolder for Empty Tissue Info
 */
const EMPTY_TISSUE_INFO: TissueInfo = {
  id: '',
  label: '',
};

/** The component displays the biomarker details which includes the details, gradient legends, size legends and source lists*/
@Component({
  selector: 'ftu-biomarker-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    BiomarkerTableComponent,
    BiomarkerTableDataCardComponent,
    GradientLegendComponent,
    HoverDirective,
    LabelBoxComponent,
    SizeLegendComponent,
    SourceListComponent,
    EmptyBiomarkerComponent,
  ],
  templateUrl: './biomarker-details.component.html',
  styleUrls: ['./biomarker-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerDetailsComponent {
  private readonly dataService = inject(FtuDataService);

  /** Table tabs */
  readonly tabs = selectSnapshot(CellSummarySelectors.aggregates);

  /** Info to be shown on the tooltip for Gradient Legend */
  readonly gradientHoverInfo = selectQuerySnapshot(RR.anyText, Ids.GradientLegendInfo);

  /** Info to be shown on the tooltip for Size Legend */
  readonly sizeHoverInfo = selectQuerySnapshot(RR.anyText, Ids.SizeLegendInfo);

  /** Indicates if the table is fully shown, defaults to false*/
  isTableFullScreen = false;

  /** Gradient colors along with their stop points */
  readonly gradients = selectQuerySnapshot(RR.field, Ids.GradientLegend, RTypes.Gradient, 'points' as const, [])<
    GradientPoint[]
  >;

  /** Taking input for the radius of the circle and the label to be displayed. */
  readonly sizes = selectQuerySnapshot(RR.field, Ids.SizeLegend, RTypes.Size, 'sizes' as const, [])<SizeLegend[]>;

  /** List of sources with titles and links displayed to the user */
  readonly source = selectSnapshot(SourceRefsSelectors.sourceReferences);

  /** List of sources with titles and links displayed to the user */
  readonly sources = selectSnapshot(ActiveFtuSelectors.sources);

  /**
   * Iri  of medical illustration behavior component
   */
  readonly iri = selectSnapshot(ActiveFtuSelectors.iri);

  /**
   * Get all tissues
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);

  /** Selects the cells hovered currently to highlight in table */
  readonly selectedOnHovered = selectSnapshot(IllustratorSelectors.selectedOnHovered);

  /** Illustration mapping data */
  readonly mapping = selectSnapshot(IllustratorSelectors.mapping);

  /** Action to highlight a cell type */
  readonly highlightCell = dispatch(IllustratorActions.HighlightCellType);

  readonly setSources = dispatch(ActiveFtuActions.SetSources);

  readonly setIllustrationUrl = dispatch(ActiveFtuActions.SetIllustrationUrl);

  readonly load = dispatch(CellSummaryActions.Load);

  readonly computeAggregates = dispatch(CellSummaryActions.ComputeAggregates);

  readonly updateSummaries = dispatch(CellSummaryActions.UpdateSummaries);

  readonly updateSources = dispatch(CellSummaryActions.UpdateSources);

  /**
   * Gets tissue title from the list of tissues
   */
  get tissueInfo(): TissueInfo {
    const iri = this.iri();
    const tissues = this.tissues();
    if (iri === undefined || tissues === undefined) {
      return EMPTY_TISSUE_INFO;
    }
    const { id, label } = tissues[iri];
    return { id, label };
  }

  /**
   * Gets ids for cells in the illustration
   */
  get illustrationIds(): string[] {
    return Array.from(new Set(this.mapping().map((data) => data.ontologyId)));
  }

  /**
   * button text of empty biomarker component.
   */
  readonly collaborateText = 'Collaborate with the HRA Team';

  /**
   * message markdown of empty biomarker component.
   */
  readonly message = `We currently do not have cell type data for this biomarker.
  <br><br> Please contact us to discuss your dataset.`;

  /** A dispatcher function to set the screen mode */
  private readonly setScreenMode = dispatch(ScreenModeAction.Set);

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** A function that toggles isTableFullScreen and
   * calls the setScreenMode function.
   */
  toggleFullscreen(): void {
    this.isTableFullScreen = !this.isTableFullScreen;
    this.setScreenMode(this.isTableFullScreen);
  }

  /** A function which opens the contact modal dialog box */
  collaborate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.ga.event('contact_open', 'modal');
    this.dialog.open(ContactBehaviorComponent, dialogConfig);
  }

  /**
   * Highlights cells matching the label
   * @param event
   */
  highlightCells(label?: string) {
    this.highlightCell(label);
  }

  /**
   * Logs tab change event
   * @param event tab change event
   */
  logTabChange(event: MatTabChangeEvent) {
    this.ga.event('biomarker_tab_change', event.tab ? event.tab.textLabel : '');
  }

  updateSourceSelection(sources: SourceListItem[]) {
    this.updateSources(sources);
  }
}
