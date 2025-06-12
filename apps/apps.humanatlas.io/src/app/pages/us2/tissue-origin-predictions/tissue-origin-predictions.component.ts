import { Overlay, OverlayModule, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  Renderer2,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CellSummaryReport } from '@hra-api/ng-client';
import { BackButtonBarComponent } from '@hra-ui/design-system/navigation/back-button-bar';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { saveAs } from 'file-saver';
import { TissuePredictionData } from '../../../services/hra-pop-predictions/hra-pop-predictions.service';
import { SimilarAnatomicalStructuresTableComponent } from './components/similar-anatomical-structures-table/similar-anatomical-structures-table.component';
import { SimilarDatasetsTableComponent } from './components/similar-datasets-table/similar-datasets-table.component';
import moment from 'moment';

/**
 * Script URL for EUI
 * TODO: Currently using Staging URL, need to change to production URL.
 * */
const SCRIPT_URL = 'https://cdn.humanatlas.io/ui--staging/ccf-eui/wc.js';

/**
 * Style URLs for EUI
 * TODO: Currently using Staging URL, need to change to production URL.
 */
const STYLE_URLS = ['https://cdn.humanatlas.io/ui--staging/ccf-eui/styles.css'];

/** Empty Inputs for Predictions page */
const EMPTY_DATA: TissuePredictionData = {
  file: new File([], ''),
};

/** Empty predictions */
export const EMPTY_PREDICTIONS: CellSummaryReport = {
  rui_locations: [],
  sources: [],
};

/**
 * Tissue Origin Predictions result page
 */
@Component({
  selector: 'hra-tissue-origin-predictions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    OverlayModule,
    WorkflowCardModule,

    MatButton,
    BackButtonBarComponent,
    ScrollingModule,
    SimilarAnatomicalStructuresTableComponent,
    SimilarDatasetsTableComponent,
  ],
  templateUrl: './tissue-origin-predictions.component.html',
  styleUrl: './tissue-origin-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TissueOriginPredictionsComponent {
  /** Input data for predictions page */
  readonly data = input<TissuePredictionData>(EMPTY_DATA);

  /** Prediction date */
  readonly predictionDate = moment(this.data().date).format('MMMM D, YYYY h:mm:ss A');

  /** Predictions */
  readonly predictions = input<CellSummaryReport>(EMPTY_PREDICTIONS);

  /** Whether to show EUI */
  protected readonly euiOpen = signal<boolean>(false);

  /** RUI locations JSON string */
  protected readonly ruiLocationsJsonString = JSON.stringify([JSON.stringify(this.predictions().rui_locations)]);

  /** For accessing DOM  */
  private readonly document = inject(DOCUMENT);

  /** For manuplating DOM elements */
  private readonly renderer = inject(Renderer2);

  /** Scroll strategy */
  protected readonly scrollStrategy = inject(ScrollStrategyOptions).block();

  /** Snackbar service */
  protected readonly snackbar = inject(SnackbarService);

  /** Overlay */
  private readonly overlay = inject(Overlay);
  /** View Container Reference */
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** EUI Template */
  private readonly euiTemplate = viewChild.required('euiTemplate', { read: TemplateRef });
  /** Portal for the EUI */
  private readonly euiPortal = computed(() => new TemplatePortal(this.euiTemplate(), this.viewContainerRef));
  /** EUI Overlay */
  private readonly euiOverlay = this.overlay.create({
    disposeOnNavigation: true,
    height: '100vh',
    maxHeight: '100vh',
    scrollStrategy: this.overlay.scrollStrategies.block(),
    panelClass: 'eui-overlay-container',
  });

  /**
   * Constructor that initializes the component and sets up effects for predictions and sorting
   */
  constructor() {
    this.setupScriptAndStyleTags();

    effect((cleanup) => {
      if (this.euiOpen()) {
        const scrollTop = this.document.scrollingElement?.scrollTop ?? 0;
        const positionStrategy = this.overlay.position().global().top(`${scrollTop}px`).right();
        this.euiOverlay.updatePositionStrategy(positionStrategy);
        this.euiOverlay.attach(this.euiPortal());
        cleanup(() => this.euiOverlay.detach());
      }
    });
  }

  /** Triggered when clicked download JSON-LD button */
  onDownloadJSONButtonClicked() {
    const jsonString = JSON.stringify(this.predictions().rui_locations, null, 2);
    const fileToSave = new Blob([jsonString], { type: 'application/json' });
    saveAs(fileToSave, 'rui_locations.jsonld');
    this.snackbar.open('File downloaded', '', false, 'start', { duration: 6000 });
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
