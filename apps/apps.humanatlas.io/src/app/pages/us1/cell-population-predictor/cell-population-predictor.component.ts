import { OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  InjectionToken,
  Injector,
  Renderer2,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { assetUrl } from '@hra-ui/common/url';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { IconComponent } from '@hra-ui/design-system/icons';
import { InfoMessageIndicatorComponent } from '@hra-ui/design-system/indicators/message-indicator/info-message-indicator';
import { HraPopPredictionsService } from '../../../services/hra-pop-predictions/hra-pop-predictions.service';
import { focusAfterNextRender } from '../../../utils/focus';
import { EmbeddedRuiComponent } from './rui/embedded-rui.component';

/** RUI script URL */
const SCRIPT_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/wc.js';

/** RUI style URL */
const STYLE_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/styles.css';

/** Extraction site template on GitHub, the same file as the example */
const EXAMPLE_FILE_URL =
  'https://github.com/x-atlas-consortia/hra-apps/blob/main/applications/us1-spatial-to-cell/registration-data.json';

/** Sample JSON file URL */
export const SAMPLE_JSON_FILE_URL = new InjectionToken<string>('', {
  providedIn: 'root',
  factory: () => 'assets/sample-data/cell-population-sample.json',
});

/** Sample JSON file */
export const SAMPLE_JSON_FILE = new InjectionToken('Sample file', {
  providedIn: 'root',
  factory: loadSampleFileFactory,
});

/**
 * Loads a sample JSON file from the configured assets URL and wraps it in a File object.
 * @returns A HttpResourceRef that resolves to a File or undefined
 */
function loadSampleFileFactory(): HttpResourceRef<File | undefined> {
  const fileUrl = inject(SAMPLE_JSON_FILE_URL);
  const url = assetUrl(fileUrl);
  return httpResource.text(url, {
    parse: (content) => new File([content], 'example.json', { type: 'application/json' }),
  });
}

/**
 * Cell Population Predictor Page Component
 */
@Component({
  selector: 'hra-cell-population-predictor',
  imports: [
    HraCommonModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    RouterModule,
    DeleteFileButtonComponent,
    EmbeddedRuiComponent,
    IconComponent,
    InfoMessageIndicatorComponent,
  ],
  templateUrl: './cell-population-predictor.component.html',
  styleUrl: './cell-population-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictorComponent {
  /** File */
  protected file?: File = undefined;

  /** Example file link */
  protected readonly exampleFileUrl = EXAMPLE_FILE_URL;

  /** Sample file */
  private readonly sampleFile = inject(SAMPLE_JSON_FILE).value.asReadonly();

  /** HRA pop Predictions Service */
  private readonly predictionsService = inject(HraPopPredictionsService);

  /** Whether to show RUI form */
  protected ruiOpen = false;

  /** Host element */
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Injector for scheduling focus moves */
  private readonly injector = inject(Injector);

  /** Use example button, shown while no file is loaded */
  private readonly useExampleButton = viewChild('useExampleButton', { read: ElementRef<HTMLButtonElement> });

  /** Create button, which opens the RUI */
  private readonly createButton = viewChild('createButton', { read: ElementRef<HTMLButtonElement> });

  /** Delete button, shown while a file is loaded */
  private readonly deleteButton = viewChild(DeleteFileButtonComponent, { read: ElementRef<HTMLElement> });

  /** Supported organs */
  protected readonly supportedOrgans = this.predictionsService.supportedOrgans;

  /** For accessing DOM  */
  private readonly document = inject(DOCUMENT);

  /** For manuplating DOM elements */
  private readonly renderer = inject(Renderer2);

  /** Router */
  private readonly router = inject(Router);

  /**
   * Constructor that initializes the component and sets up effects for supported organs and sets script and link tags
   */
  constructor() {
    this.setupScriptAndStyleTags();
  }

  /** Triggered when user uploads a file */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.setFile(input.files[0]);
    }
  }

  /** Output file from RUI, which closes it */
  onFileCreated(file: File): void {
    this.ruiOpen = false;
    this.setFile(file, true);
  }

  /** Closes the RUI without a file and returns focus to the button that opened it */
  onRuiClosed(): void {
    this.ruiOpen = false;
    this.moveFocus(() => this.createButton()?.nativeElement, true);
  }

  /** Use the example JSON file */
  onUseSampleClicked(): void {
    this.setFile(this.sampleFile());
  }

  /** Removes the loaded file */
  clearFile(): void {
    this.file = undefined;
    this.moveFocus(() => this.useExampleButton()?.nativeElement);
  }

  /**
   * Sets the file and moves focus to its delete button, which replaces the focused button
   *
   * @param file File to use
   * @param force Whether to move focus even when it is outside this page, such as in the RUI overlay
   */
  private setFile(file: File | undefined, force = false): void {
    this.file = file;
    if (file) {
      this.moveFocus(() => this.deleteButton()?.nativeElement.querySelector('button'), force);
    }
  }

  /**
   * Moves focus once the view has updated
   *
   * @param getTarget Returns the element to focus
   * @param force Whether to move focus even when it is outside this page
   */
  private moveFocus(getTarget: () => HTMLElement | null | undefined, force = false): void {
    focusAfterNextRender(this.elementRef.nativeElement, getTarget, this.injector, force);
  }

  /** Method that sets script and link tags with appropriate URLs */
  private setupScriptAndStyleTags(): void {
    const { document, renderer } = this;
    const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    const styles = document.querySelector(`link[href="${STYLE_URL}"]`);

    if (script === null) {
      const el = renderer.createElement('script');
      renderer.setAttribute(el, 'src', SCRIPT_URL);
      renderer.setAttribute(el, 'type', 'module');
      document.head.appendChild(el);
    }

    if (styles == null) {
      const el = renderer.createElement('link');
      renderer.setAttribute(el, 'href', STYLE_URL);
      renderer.setAttribute(el, 'rel', 'stylesheet');
      document.head.appendChild(el);
    }
  }

  /** Triggered when user click the predict button */
  onPredictClicked() {
    this.router.navigate(['us1/result'], {
      info: { file: this.file },
    });
  }
}
