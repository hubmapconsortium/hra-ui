import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  input,
  output,
  Renderer2,
  viewChild,
} from '@angular/core';

/**
 * RUI Interface
 */
interface RuiElement {
  /** Supported organs string array */
  organOptions: string[];
  /** Function to emit registration file */
  register: (location: object) => void;
  /** Function to cancel registration */
  cancelRegistration: () => void;
}

/** RUI script URL */
const SCRIPT_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/wc.js';
/** RUI style URL */
const STYLE_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/styles.css';

/**
 * Embedded Registration User Interface Component
 */
@Component({
  selector: 'hra-embedded-rui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './embedded-rui.component.html',
  styleUrl: './embedded-rui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmbeddedRuiComponent {
  /** Supported Organs */
  readonly supportedOrgans = input<string[]>([]);
  /** File Created after Registration */
  readonly locationCreated = output<File>();
  /** Close RUI */
  readonly closed = output();
  /** Reference to the rui element in template */
  private readonly ref = viewChild.required<ElementRef<RuiElement>>('rui');
  /** For accessing DOM  */
  private readonly document = inject(DOCUMENT);
  /** For manuplating DOM elements */
  private readonly renderer = inject(Renderer2);

  /**
   * Constructor that initializes the component, sets up effect for setting RUI properties & methods, and
   * sets script and link tags
   */
  constructor() {
    this.setupScriptAndStyleTags();

    effect(() => {
      const el = this.ref().nativeElement;
      el.organOptions = this.supportedOrgans();
      el.register = (location) => this.locationCreated.emit(this.createFileFromLocation(location));
      el.cancelRegistration = () => this.closed.emit();
    });
  }

  /** Creates new file from location object with the name "rui-location.json" */
  private createFileFromLocation(location: object): File {
    return new File([JSON.stringify(location)], 'rui-location.json');
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
}
