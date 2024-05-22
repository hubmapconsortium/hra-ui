import { ChangeDetectionStrategy, Component, OnInit, computed, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatIconModule } from '@angular/material/icon';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { Rgb, hexToRgb, rgbToHex } from '../../models/color';

@Component({
  selector: 'cde-color-picker-label',
  standalone: true,
  imports: [CommonModule, ColorPickerModule, MatIconModule, OverlayModule],
  templateUrl: './color-picker-label.component.html',
  styleUrl: './color-picker-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerLabelComponent implements OnInit {
  readonly color = model.required<Rgb>();
  readonly label = input.required<string>();
  readonly labelPos = input<string>('right');
  readonly isAnchor = input<boolean>(false);

  readonly hexColor = computed(() => rgbToHex(this.color()));

  tooltipOpen = false;
  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'top',
      overlayY: 'top',
      offsetX: 70,
      offsetY: -10,
    },
  ];

  ngOnInit() {
    this.overlayPositions = [
      {
        originX: 'end',
        overlayX: 'start',
        originY: 'top',
        overlayY: 'top',
        offsetX: this.labelPos() === 'right' ? 70 : -280,
        offsetY: -10,
      },
    ];
  }

  updateColor(hex: string): void {
    this.color.set(hexToRgb(hex));
  }
}
