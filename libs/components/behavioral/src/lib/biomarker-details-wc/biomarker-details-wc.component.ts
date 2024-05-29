import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import {
  BiomarkerTableDataCardComponent,
  InteractiveSvgComponent,
  SourceListComponent,
} from '@hra-ui/components/molecules';
import { BiomarkerTableComponent, DataCell, TissueInfo } from '@hra-ui/components/organisms';
import { IllustrationMappingItem } from '@hra-ui/services';
import {
  ActiveFtuSelectors,
  CellSummaryAggregate,
  CellSummarySelectors,
  IllustratorActions,
  IllustratorSelectors,
  ResourceIds as Ids,
  ResourceTypes as RTypes,
  ScreenModeAction,
  SourceRefsActions,
  SourceRefsSelectors,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';

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
   * Reference to the biomarker table component
   */
  @ViewChild('table') table!: BiomarkerTableComponent<DataCell>;

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
  readonly getTabs = selectSnapshot(CellSummarySelectors.aggregates);

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
   * Gets tabs containing cell summary aggregate data
   */
  get tabs(): CellSummaryAggregate[] {
    const tabs = this.getTabs();
    if (tabs !== this.tabs_ && tabs.length !== 0) {
      this.tabs_ = tabs;
    }

    return this.tabs_;
  }

  /**
   * Gets ids for cells in the illustration
   */
  get illustrationIds(): string[] {
    const mapping = this.mapping();
    if (mapping !== this.mapping_) {
      this.mapping_ = mapping;
      this.illustrationIds_ = Array.from(new Set(this.mapping().map((data) => data.ontologyId)));
    }

    return this.illustrationIds_;
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

  /** Sets currently selected sources */
  readonly setSelectedSources = dispatch(SourceRefsActions.SetSelectedSources);

  /** A dispatcher function to set the screen mode */
  private readonly setScreenMode = dispatch(ScreenModeAction.Set);

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** Mapping item reference */
  private mapping_: IllustrationMappingItem[] = [];
  /** Illustration ids reference */
  private illustrationIds_: string[] = [];
  /** Tabs reference */
  private tabs_: CellSummaryAggregate[] = [];

  /** Returns the index number */
  trackByIndex(index: number): number {
    return index;
  }

  /** A function that toggles isTableFullScreen and
   * calls the setScreenMode function.
   */
  toggleFullscreen(): void {
    setTimeout(() => {
      this.table.checkDisplayedColumns();
    }, 250);

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
