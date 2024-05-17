import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatIconModule } from '@angular/material/icon';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'cde-color-picker-label',
  standalone: true,
  imports: [CommonModule, ColorPickerModule, MatIconModule, OverlayModule],
  templateUrl: './color-picker-label.component.html',
  styleUrl: './color-picker-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerLabelComponent {
  readonly color = model.required<string>();
  readonly label = input.required<string>();
  readonly isAnchor = input<boolean>(false);
  tooltipOpen = false;
  readonly overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'top',
      overlayY: 'top',
      offsetY: -10,
    },
  ];
}
