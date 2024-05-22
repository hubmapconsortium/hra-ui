import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import { Rgb, hexToRgb, rgbToHex } from '../../models/color';

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

  readonly hexColor = computed(() => rgbToHex(this.color()));

  tooltipOpen = false;
  readonly overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'start',
      overlayX: 'end',
      originY: 'center',
      overlayY: 'center',
      offsetX: -26,
    },
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'center',
      overlayY: 'center',
      offsetX: 4,
    },
  ];

  @Output() colorChanged = new EventEmitter<{ type: string; color: Rgb }>();

  updateColor(hex: string): void {
    this.color.set(hexToRgb(hex));
    this.colorChanged.emit({ type: this.label(), color: this.color() });
  }
}
