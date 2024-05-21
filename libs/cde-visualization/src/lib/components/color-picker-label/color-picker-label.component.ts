import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, model, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import { Rgb, hexToRgb, rgbToHex } from '../../models/color';
import { TOOLTIP_POSITION_HORIZONTAL } from '../../shared/tooltip-position';

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

  readonly hexColor = signal('#000000');

  readonly tooltipPosition = TOOLTIP_POSITION_HORIZONTAL;

  tooltipOpen = false;

  constructor() {
    effect(() => this.hexColor.set(rgbToHex(this.color())), { allowSignalWrites: true });
  }

  selectColor(hex: string): void {
    this.color.set(hexToRgb(hex));
  }
}
