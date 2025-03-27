import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  input,
  output,
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

  /**
   * Constructor that initializes the component, sets up effect for setting RUI properties & methods
   */
  constructor() {
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
}
