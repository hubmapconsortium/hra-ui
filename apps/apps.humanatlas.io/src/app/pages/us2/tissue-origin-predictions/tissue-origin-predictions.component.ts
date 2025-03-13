import { OverlayModule, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  Renderer2,
  viewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BackButtonBarComponent } from '@hra-ui/design-system/buttons/back-button-bar';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { saveAs } from 'file-saver';
import {
  Sources,
  TissueOriginPredictions,
  TissueOriginService,
  UserSelectionService,
} from '../services/tissue-origin.service';

/** Script URL for EUI */
const SCRIPT_URL = 'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@gh-pages/wc.js';

/** Style URLs for EUI */
const STYLE_URLS = [
  'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@gh-pages/styles.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined',
];

/** Tooltip content */
const TOOLTIP_CONTENT = `Cell Population: Number of cells per cell type in a tissue block, anatomical structure,
or extraction site. Cell summaries are computed from cell type counts in experimental datasets, obtained either via
cell type annotations in the HRA Workflows Runner (for sc-transcriptomics datasets), or via expert/author-provided annotations (sc-proteomics datasets).`;

/** Column names for Anatomical Structures table */
const ANATOMICAL_STRUCTURES_COLUMN_NAMES = [
  'Tool',
  'Modality',
  'Similarity',
  'Anatomical Structure Label',
  'Anatomical Structure ID',
];

/** Column names for Similar Datasets table */
const DATASET_COLUMN_NAMES = ['Tool', 'Modality', 'Similarity', 'Datset Label', 'Dataset ID', 'Dataset Link'];

/**
 * Tissue Origin Predictions result page
 */
@Component({
  selector: 'hra-tissue-origin-predictions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButton,
    MatMenuModule,

    WorkflowCardModule,
    OverlayModule,
    BackButtonBarComponent,
    TooltipCardComponent,
    ScrollingModule,
  ],
  templateUrl: './tissue-origin-predictions.component.html',
  styleUrl: './tissue-origin-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TissueOriginPredictionsComponent {
  /** Predictions */
  readonly predictions = input<TissueOriginPredictions>({ sources: [], rui_locations: [] });

  /** Data for Anatomical Structures table */
  protected readonly anatomicalDataSource = new MatTableDataSource<Sources>([]);

  /** Data for Datasets table */
  protected readonly datasetDataSource = new MatTableDataSource<Sources>([]);

  /** Sorting on Anatomical Structures table */
  protected readonly sortOnAnatomicalData = viewChild.required<MatSort>('sort1');

  /** Sorting on Datasets table */
  protected readonly sortOnDatasetsData = viewChild.required<MatSort>('sort2');

  /** Columns for anatomical structures table */
  protected readonly anatomicalColumns = ['tool', 'modality', 'similarity', 'cell_source_label', 'cell_source'];

  protected readonly tissueOriginPredictionService = inject(TissueOriginService);

  protected readonly userSelectionService = inject(UserSelectionService);

  /** Whether to show EUI */
  protected euiOpen = false;

  protected readonly ruiLocationsJsonString = JSON.stringify([JSON.stringify(this.predictions().rui_locations)]);

  /** For accessing DOM  */
  private readonly document = inject(DOCUMENT);

  /** For manuplating DOM elements */
  private readonly renderer = inject(Renderer2);

  /** Columns for datasets table */
  protected readonly datasetsColumns = [
    'tool',
    'modality',
    'similarity',
    'cell_source_label',
    'cell_source',
    'cell_source_link',
  ];

  /** Scroll strategy */
  protected readonly scrollStrategy = inject(ScrollStrategyOptions).block();

  /** Tooltip content */
  protected readonly tooltip: TooltipContent[] = [
    {
      description: TOOLTIP_CONTENT,
    },
  ];

  /**
   * Constructor that initializes the component and sets up effects for predictions and sorting
   */
  constructor() {
    this.setupScriptAndStyleTags();

    effect(() => {
      this.anatomicalDataSource.data = this.predictions().sources.filter(
        (source) => source.cell_source_type === 'http://purl.org/ccf/AnatomicalStructure',
      );
      this.datasetDataSource.data = this.predictions().sources.filter(
        (source) => source.cell_source_type === 'http://purl.org/ccf/Dataset',
      );
    });

    effect(() => {
      this.anatomicalDataSource.sort = this.sortOnAnatomicalData();
      this.datasetDataSource.sort = this.sortOnDatasetsData();
    });
  }

  /** Triggered when clicked download JSON-LD button */
  onDowloadJSONButtonClicked() {
    const jsonString = JSON.stringify(this.predictions().rui_locations, null, 2);
    const fileToSave = new Blob([jsonString], { type: 'application/json' });
    saveAs(fileToSave, 'rui_locations.jsonld');
  }

  /** Triggered when clicked on download CSV button  */
  onDowloadCSVButtonClicked(type: string) {
    const csvString = this.convertToCSV(type);
    const fileToSave = new Blob([csvString], { type: 'text/csv' });
    saveAs(fileToSave, `${type}.csv`);
  }

  /** Utility function to convert table data to CSV string */
  convertToCSV(type: string): string {
    const fields = ['tool', 'modality', 'similarity', 'cell_source_label', 'cell_source'] as (keyof Sources)[];

    if (type === 'anatomical') {
      const headers = ANATOMICAL_STRUCTURES_COLUMN_NAMES.join(',') + '\n';
      const data = this.anatomicalDataSource.data;
      const rows = data.map((row) => fields.map((field) => row[field]).join(',')).join('\n');

      return headers + rows;
    } else {
      fields.push('cell_source_link');

      const headers = DATASET_COLUMN_NAMES.join(',') + '\n';
      const data = this.datasetDataSource.data;
      const rows = data.map((row) => fields.map((field) => row[field]).join(',')).join('\n');

      return headers + rows;
    }
  }

  /** Triggered when clicked on Explore button. Opens EUI */
  onExploreButtonClicked() {
    this.euiOpen = true;
  }

  /** Method that sets script and link tags with appropriate URLs */
  private setupScriptAndStyleTags(): void {
    const { document, renderer } = this;
    const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    const styles = Array.from(document.querySelectorAll('link')).map((item) => item.href);
    const isStyleIncluded = STYLE_URLS.every((style) => styles.includes(style));

    if (script === null) {
      const el = renderer.createElement('script');
      renderer.setAttribute(el, 'src', SCRIPT_URL);
      renderer.setAttribute(el, 'type', 'module');
      document.head.appendChild(el);
    }

    if (!isStyleIncluded) {
      STYLE_URLS.forEach((URL) => {
        const el = renderer.createElement('link');
        renderer.setAttribute(el, 'href', URL);
        renderer.setAttribute(el, 'rel', 'stylesheet');
        document.head.appendChild(el);
      });
    }
  }
}
