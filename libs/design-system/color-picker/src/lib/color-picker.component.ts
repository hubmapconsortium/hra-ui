import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, output, signal } from '@angular/core';
import { colorEquals, hexToRgb, Rgb } from './color-utils';
import { ColorPickerDirective, ColorPickerModule } from 'ngx-color-picker';

/** Color Picker Component */
@Component({
  selector: 'hra-color-picker',
  imports: [CommonModule, ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  /** The RGB color value */
  readonly color = model.required<Rgb>();

  /** Emits when the color picker is opened or closed */
  readonly colorPickerOpen = output<ColorPickerDirective | null>();

  /** Hex representation of the color */
  readonly hexColor = signal('#000000');

  /** Select a new color from the color picker */
  selectColor(hex: string): void {
    const rgb = hexToRgb(hex);
    if (!colorEquals(this.color(), rgb)) {
      this.color.set(rgb);
    }
  }
}
