import { A11yModule } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { colorEquals, hexToRgb, Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
import { ColorPickerDirective } from 'ngx-color-picker';

/** Opens beside the origin: to its right, or to its left where there's no room */
const COLOR_PICKER_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 8 },
  { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 8 },
  { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -8 },
  { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -8 },
];

/**
 * Color picker dialog that opens beside an origin element. It renders in the overlay container,
 * so it keeps the theme in every host and doesn't change the layout around the origin.
 * Apply or a click outside keeps the color, and Cancel or Escape discards it.
 * Closing returns focus to the origin.
 */
@Component({
  selector: 'cde-color-picker',
  imports: [A11yModule, ColorPickerDirective, OverlayModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  /** Element the picker opens beside. It gets focus back when the picker closes. */
  readonly origin = input.required<CdkOverlayOrigin>();

  /** Accessible name of the picker dialog */
  readonly label = input.required<string>();

  /** Whether the picker is open */
  readonly open = model(false);

  /** Color being edited. Changes when a color is kept. */
  readonly color = model.required<Rgb>();

  /** Emits the color shown while picking, and the color in effect again when a change is discarded */
  readonly preview = output<string>();

  /** Positions beside the origin */
  protected readonly positions = COLOR_PICKER_POSITIONS;

  /** Hex representation of the color */
  protected readonly hexColor = computed(() => rgbToHex(this.color()));

  /** Injector, used to wait for the picker to render before focusing it */
  private readonly injector = inject(Injector);

  /** Picker dialog, while open */
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  /** Color shown while picking */
  private previewHex = '';

  /** Starts picking from the current color and moves focus into the picker once it renders */
  protected handleAttach(): void {
    this.previewHex = this.hexColor();
    afterNextRender(() => this.panel()?.nativeElement.querySelector('input')?.focus(), { injector: this.injector });
  }

  /**
   * Shows a color while picking
   *
   * @param hex Color shown in the picker
   */
  protected handleChange(hex: string): void {
    this.previewHex = hex;
    this.preview.emit(hex);
  }

  /**
   * Keeps a color and closes the picker
   *
   * @param hex Color to keep. Defaults to the color shown while picking.
   */
  protected apply(hex = this.previewHex): void {
    const rgb = hexToRgb(hex);
    if (!colorEquals(this.color(), rgb)) {
      this.color.set(rgb);
    }
    this.close();
  }

  /** Discards the color shown while picking and closes the picker */
  protected cancel(): void {
    this.preview.emit(this.hexColor());
    this.close();
  }

  /**
   * Discards the color shown while picking when Escape is pressed
   *
   * @param event Keyboard event in the picker
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !hasModifierKey(event)) {
      event.preventDefault();
      this.cancel();
    }
  }

  /** Closes the picker and returns focus to its origin */
  private close(): void {
    if (this.open()) {
      this.open.set(false);
      this.origin().elementRef.nativeElement.focus();
    }
  }
}
