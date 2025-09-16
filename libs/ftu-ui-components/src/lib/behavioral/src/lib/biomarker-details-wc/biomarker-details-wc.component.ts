import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { InteractiveSvgComponent, SourceListComponent, SourceListItem } from '../../../../molecules/src';
import {
  BiomarkerTableComponent,
  DataCell,
  TissueInfo,
} from '../../../../organisms/src/lib/biomarker-table/biomarker-table.component';
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
import {
  EmptyBiomarkerComponent,
  GradientLegendComponent,
  GradientPoint,
  SizeLegend,
  SizeLegendComponent,
} from '../../../../atoms/src';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DialogService } from '@hra-ui/design-system/dialog';
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
  imports: [
    ButtonsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    SourceListComponent,
    InteractiveSvgComponent,
    EmptyBiomarkerComponent,
    GradientLegendComponent,
    SizeLegendComponent,
    BiomarkerTableComponent,
  ],
  templateUrl: './biomarker-details-wc.component.html',
  styleUrls: ['./biomarker-details-wc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.no-data-sources]': 'source().length === 0',
    '[class.no-data]':
      'source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)',
    '[class.no-data-selected]': 'source().length > 0 && selectedSources().length === 0',
  },
})
export class BiomarkerDetailsWcComponent {
  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** Dialog service for opening notice dialogs */
  private readonly dialogService = inject(DialogService);

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** Text to be copied to clipboard */
  emailText = 'infoccf@iu.edu';

  /** Component constructor */
  constructor() {
    effect(() => {
      const hasUrl = !!this.currentUrl();
      const hasMapping = !!this.mapping();
      const tabs = this.getTabs();

      if (!hasUrl || !hasMapping) {
        return;
      }
      const dataLoadingComplete = Array.isArray(tabs);

      if (dataLoadingComplete) {
        const hasNoData = tabs.length === 0 || tabs.every((tab) => tab.rows.length === 0);

        if (hasNoData) {
          this.dialogService.openNotice(
            '',
            'We currently do not have cell type by gene, protein, or lipid biomarker data for this functional tissue unit. Please email us at infoccf@iu.edu to discuss your dataset.',
            {
              label: 'Copy email',
              callback: () => {
                this.copyEmailToClipboard();
              },
            },
          );
        }
      }
    });
  }

  /**
   * Copies email to clipboard
   */
  private copyEmailToClipboard(): void {
    navigator.clipboard.writeText(this.emailText).then(() => {
      this.ga.event('email_copied', 'clipboard');
    });
  }

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

  /** Action to highlight a cell type */
  readonly highlightCell = dispatch(IllustratorActions.HighlightCellType);

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

  /** List of selected sources */
  readonly selectedSources = signal<SourceListItem[]>([]);

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

  /** Selects the cells hovered currently to highlight in table */
  readonly selectedOnHovered = selectSnapshot(IllustratorSelectors.selectedOnHovered);

  /** A dispatcher function to set the screen mode */
  private readonly setScreenMode = dispatch(ScreenModeAction.Set);

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

  /**
   * Logs tab change event
   * @param event tab change event
   */
  logTabChange(event: MatTabChangeEvent) {
    this.ga.event('biomarker_tab_change', event.tab ? event.tab.textLabel : '');
  }

  /** Toggle options for the biomarker table */
  readonly toggleOptions = [
    { value: 'genes', label: 'Genes' },
    { value: 'proteins', label: 'Proteins' },
    { value: 'lipids', label: 'Lipids' },
  ];

  /** Active tab index */
  private activeTabIndex = 0;

  /** Selected toggle value */
  selectedToggleValue = 'genes';

  /**
   * Handle toggle change from biomarker table
   * @param value selected toggle value
   */
  onToggleChange(value: string): void {
    const index = this.toggleOptions.findIndex((option) => option.value === value);
    if (index !== -1) {
      this.activeTabIndex = index;
    }
  }

  /** Table tabs */
  get tab(): CellSummaryAggregate {
    const tabs = this.getTabs();
    return tabs[this.activeTabIndex] ?? { label: '', columns: [], rows: [] };
  }

  /**
   * Determines if a toggle option is disabled.
   * @param index index of the toggle option
   * @returns true if the toggle option is disabled, false otherwise
   */
  isToggleOptionDisabled(index: number): boolean {
    const tab = this.getTabs()[index] ?? { label: '', columns: [], rows: [] };
    return tab ? tab.rows.length === 0 : true;
  }

  /**
   * Highlights cells matching the label
   * @param event
   */
  highlightCells(label?: string) {
    this.highlightCell(label);
  }
}
