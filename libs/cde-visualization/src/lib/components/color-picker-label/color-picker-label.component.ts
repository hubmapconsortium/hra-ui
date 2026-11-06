import { OverlayModule } from '@angular/cdk/overlay';
import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
import { TOOLTIP_POSITION_COLOR_PICKER_LABEL } from '../../shared/tooltip-position';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

/**
 * Color Picker Label Component
 */
@Component({
  selector: 'cde-color-picker-label',
  imports: [HraCommonModule, ColorPickerComponent, MatIconModule, OverlayModule],
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

  /** Swatch color: the color, or the color shown while picking */
  protected readonly swatchColor = linkedSignal(() => rgbToHex(this.color()));

  /** Whether the color picker is open */
  protected readonly pickerOpen = signal(false);

  /** Accessible name of the swatch and the color picker */
  protected readonly pickerLabel = computed(() => `${this.label()} color`);

  /** Tooltip position for the color picker label */
  readonly tooltipPosition = TOOLTIP_POSITION_COLOR_PICKER_LABEL;

  /** Tooltip open state */
  tooltipOpen = false;

  /** Anchor open state */
  anchorOpen = false;

  /** Handle hover event to open the tooltip if the label is truncated */
  handleHover(event: MouseEvent): void {
    const label = event.currentTarget as HTMLElement;
    if (label.scrollWidth > label.clientWidth) {
      this.tooltipOpen = true;
    }
  }
}
