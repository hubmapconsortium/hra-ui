import { OverlayModule } from '@angular/cdk/overlay';
import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, effect, input, model, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerDirective } from 'ngx-color-picker';
import { Rgb, colorEquals, hexToRgb, rgbToHex } from '@hra-ui/design-system/color-picker';
import { TOOLTIP_POSITION_COLOR_PICKER_LABEL } from '../../shared/tooltip-position';

/** Maximum cell width for the cell type label */
const MAX_LABEL_WIDTH = 104;

/**
 * Color Picker Label Component
 */
@Component({
  selector: 'cde-color-picker-label',
  imports: [HraCommonModule, ColorPickerDirective, MatIconModule, OverlayModule],
  templateUrl: './color-picker-label.component.html',
  styleUrl: './color-picker-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerLabelComponent {
  /** The RGB color value */
  readonly color = model.required<Rgb>();

  /** The label text for the color picker */
  readonly label = input.required<string>();

  /** Indicates if the row is an anchor */
  readonly isAnchor = input<boolean>(false);

  /** Emits when the color picker is opened or closed */
  readonly colorPickerOpen = output<ColorPickerDirective | null>();

  /** Hex representation of the color */
  readonly hexColor = signal('#000000');

  /** Effect to sync the hex color with the RGB color */
  readonly hexColorSyncRef = effect(() => this.hexColor.set(rgbToHex(this.color())));

  /** Tooltip position for the color picker label */
  readonly tooltipPosition = TOOLTIP_POSITION_COLOR_PICKER_LABEL;

  /** Tooltip open state */
  tooltipOpen = false;

  /** Anchor open state */
  anchorOpen = false;

  /** Select a new color from the color picker */
  selectColor(hex: string): void {
    const rgb = hexToRgb(hex);
    if (!colorEquals(this.color(), rgb)) {
      this.color.set(rgb);
    }
  }

  /** Handle hover event to open the tooltip if label width exceeds the max width */
  handleHover(event: MouseEvent): void {
    const width = Math.floor((event.target as HTMLElement).getBoundingClientRect().width);
    if (width >= MAX_LABEL_WIDTH) {
      this.tooltipOpen = true;
    }
  }
}
