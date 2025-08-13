import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  output,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  model,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { IllustrationMappingItem } from '@hra-ui/services';
import {
  ActiveFtuSelectors,
  CellSummaryAggregate,
  CellSummarySelectors,
  ResourceIds as Ids,
  IllustratorActions,
  IllustratorSelectors,
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
import { SourceListComponent, SourceListItem } from '../../../../molecules/src';
import {
  BiomarkerTableComponent,
  DataCell,
  TissueInfo,
} from '../../../../organisms/src/lib/biomarker-table/biomarker-table.component';

import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonModule } from '@hra-ui/design-system/icon-button';
import { MessageIndicatorModule } from '@hra-ui/design-system/indicators/message-indicator';
import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';
import { RichTooltipModule, RichTooltipDirective } from '@hra-ui/design-system/tooltips/rich-tooltip';

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
  imports: [
    ButtonsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    IconButtonModule,
    BiomarkerTableComponent,
    GradientLegendComponent,
    SizeLegendComponent,
    SourceListComponent,
    EmptyBiomarkerComponent,
    MatButtonToggleModule,
    MessageIndicatorModule,
    RichTooltipModule,
    RichTooltipDirective,
  ],
  templateUrl: './biomarker-details.component.html',
  styleUrls: ['./biomarker-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full-screen-grid]': 'isBiomarkerfullscreen()',
    '[class.no-data-full-screen-grid]': 'source().length === 0 && isBiomarkerfullscreen()',
    '[class.no-data-sources]': 'source().length === 0 && !isBiomarkerfullscreen()',
    '[class.no-data]':
      '(source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) && !isBiomarkerfullscreen()',
    '[class.no-data-selected]': 'source().length > 0 && selectedSources().length === 0 && !isBiomarkerfullscreen()',
  },
})
export class BiomarkerDetailsComponent implements AfterViewInit {
  /** Reference to biomarker table */
  @ViewChild('table') table!: BiomarkerTableComponent<DataCell>;

  /** Tooltip text for percentage of cells legend */
  static readonly PERCENTAGE_TOOLTIP_TEXT =
    'The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.';

  /** Tooltip text for biomarker expression mean legend */
  static readonly EXPRESSION_TOOLTIP_TEXT =
    'Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.';

  /** Instance access to percentage tooltip text */
  readonly percentageTooltipText = BiomarkerDetailsComponent.PERCENTAGE_TOOLTIP_TEXT;
  /** Instance access to expression tooltip text */
  readonly expressionTooltipText = BiomarkerDetailsComponent.EXPRESSION_TOOLTIP_TEXT;

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

  /** Action to set selected sources */
  readonly setSelectedSources = dispatch(SourceRefsActions.SetSelectedSources);

  /** List of selected sources */
  readonly selectedSources = signal<SourceListItem[]>([]);

  /** Active tab index */
  private activeTabIndex = 0;

  /**
   * Determines whether biomarkerfullscreen is in fullscreen mode
   */
  readonly isBiomarkerfullscreen = model<boolean>(false);

  /**
   * Determines whether source listfullscreen is in fullscreen mode
   */
  readonly isSourceListfullscreen = model<boolean>(false);

  /**
   * View child of source list component
   */
  @ViewChild('sourceList', { static: true }) sourceListRef!: TemplateRef<unknown>;

  /**
   * Source list template of biomarker details component
   */
  readonly sourceListTemplate = output<TemplateRef<unknown>>();

  ngAfterViewInit(): void {
    if (this.sourceListRef) {
      this.sourceListTemplate.emit(this.sourceListRef);
    }
  }

  /** Table tabs */
  get tab(): CellSummaryAggregate {
    const tabs = this.getTabs();
    return tabs[this.activeTabIndex] ?? { label: '', columns: [], rows: [] };
  }

  /** Toggle options for the biomarker table */
  readonly toggleOptions = [
    { value: 'genes', label: 'Genes' },
    { value: 'proteins', label: 'Proteins' },
    { value: 'lipids', label: 'Lipids' },
  ];

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

  /** A dispatcher function to set the screen mode */
  private readonly setScreenMode = dispatch(ScreenModeAction.Set);

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** Table tabs */
  private tabs_: CellSummaryAggregate[] = [];
  /** Mapping items reference */
  private mapping_: IllustrationMappingItem[] = [];
  /** Illustration ids reference */
  private illustrationIds_: string[] = [];

  /**
   * Track a tab by it's label
   *
   * @param _index Unused index of tab
   * @param tab Tab data
   */
  trackByLabel(_index: number, tab: CellSummaryAggregate): string {
    return tab.label;
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
}
