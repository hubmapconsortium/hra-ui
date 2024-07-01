import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, model, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import { Rgb, colorEquals, hexToRgb, rgbToHex } from '../../models/color';
import { TOOLTIP_POSITION_COLOR_PICKER_LABEL } from '../../shared/tooltip-position';

const MAX_LABEL_WIDTH = 128;

@Component({
  selector: 'cde-color-picker-label',
  standalone: true,
  imports: [CommonModule, ColorPickerModule, MatIconModule, OverlayModule],
  templateUrl: './color-picker-label.component.html',
  styleUrl: './color-picker-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerLabelComponent {
  readonly color = model.required<Rgb>();
  readonly label = input.required<string>();
  readonly isAnchor = input<boolean>(false);

  readonly colorPickerOpen = output<boolean>();

  readonly hexColor = signal('#000000');
  readonly hexColorSyncRef = effect(() => this.hexColor.set(rgbToHex(this.color())), { allowSignalWrites: true });

  readonly tooltipPosition = TOOLTIP_POSITION_COLOR_PICKER_LABEL;

  tooltipOpen = false;
  anchorOpen = false;

  selectColor(hex: string): void {
    const rgb = hexToRgb(hex);
    if (!colorEquals(this.color(), rgb)) {
      this.color.set(rgb);
    }
  }

  handleHover(event: MouseEvent): void {
    if ((event.target as HTMLElement).getBoundingClientRect().width === MAX_LABEL_WIDTH) {
      this.tooltipOpen = true;
    }
  }
}
