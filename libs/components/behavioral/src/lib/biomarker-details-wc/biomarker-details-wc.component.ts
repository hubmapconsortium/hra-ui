import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { HoverDirective } from '@hra-ui/cdk';
import { selectSnapshot, selectQuerySnapshot, dispatch } from '@hra-ui/cdk/injectors';
import {
  GradientLegendComponent,
  LabelBoxComponent,
  SizeLegendComponent,
  EmptyBiomarkerComponent,
  GradientPoint,
  SizeLegend,
} from '@hra-ui/components/atoms';
import {
  BiomarkerTableDataCardComponent,
  InteractiveSvgComponent,
  SourceListComponent,
} from '@hra-ui/components/molecules';
import { TissueInfo, BiomarkerTableComponent } from '@hra-ui/components/organisms';
import {
  ActiveFtuSelectors,
  TissueLibrarySelectors,
  ScreenModeAction,
  IllustratorActions,
  IllustratorSelectors,
  CellSummarySelectors,
  ResourceIds as Ids,
  ResourceTypes as RTypes,
  SourceRefsSelectors,
} from '@hra-ui/state';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * PlaceHolder for Empty Tissue Info
 */
const EMPTY_TISSUE_INFO: TissueInfo = {
  id: '',
  label: '',
};

/** Component for Biomarker Table Details Web component */
@Component({
  selector: 'ftu-wc-biomarker-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,

    BiomarkerTableComponent,
    BiomarkerTableDataCardComponent,
    GradientLegendComponent,
    HoverDirective,
    LabelBoxComponent,
    SizeLegendComponent,
    SourceListComponent,
    EmptyBiomarkerComponent,
    InteractiveSvgComponent,
  ],
  templateUrl: './biomarker-details-wc.component.html',
  styleUrls: ['./biomarker-details-wc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerDetailsWcComponent {
  /**
   * Current illustration url
   */
  readonly currentUrl = selectSnapshot(IllustratorSelectors.url);

  /**
   * Current mapping file
   */
  readonly mapping = selectSnapshot(IllustratorSelectors.mapping);

  /**
   * Iri  of medical illustration behavior component
   */
  readonly iri = selectSnapshot(ActiveFtuSelectors.iri);

  /**
   * Get all tissues
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);

  /**
   * Gets tissue title from the list of tissues
   */
  get tissueTitle(): string {
    const iri = this.iri();
    const tissues = this.tissues();
    return iri ? tissues[iri].label : '';
  }

  /**
   * Updates the active node on node hover
   */
  readonly updateNodeOnHover = dispatch(IllustratorActions.SetHover);

  /**
   * Updates the active node on node click
   */
  readonly updateNodeOnClicked = dispatch(IllustratorActions.SetClicked);

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
  /**
   * Gets tissue title from the list of tissues
   */
  get tissueInfo(): TissueInfo {
    const iri = this.iri();
    const tissues = this.tissues();
    if (iri === undefined) {
      return EMPTY_TISSUE_INFO;
    }
    const { id, label } = tissues[iri];
    return { id, label };
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
   * Logs tab change event
   * @param event tab change event
   */
  logTabChange(event: MatTabChangeEvent) {
    this.ga.event('biomarker_tab_change', event.tab ? event.tab.textLabel : '');
  }
}
