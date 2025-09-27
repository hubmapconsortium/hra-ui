import { ConnectedPosition } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

import { Axis, Rotation } from '../rotation-slider.component';

/** Slider box */
@Component({
  selector: 'ccf-slider-box',
  templateUrl: './slider-box.component.html',
  styleUrl: './slider-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SliderBoxComponent {
  /** Slider axis */
  readonly sliderAxis = input.required<Axis>();
  /** Rotation value */
  readonly rotation = input.required<Rotation>();
  /** Step size to increase or decrease value by */
  readonly step = input.required<number>();
  /** Reset rotation */
  readonly resetRotation = output();
  /** Update rotation */
  readonly changeRotation = output<string>();

  /** Slider overlay position */
  protected readonly positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -4,
    },
  ];

  /** Whether the slider is open */
  protected readonly isSliderOpen = signal(false);

  /** Open the slider */
  showSlider(): void {
    this.isSliderOpen.set(true);
  }

  /** Close the slider */
  closeSlider(): void {
    this.isSliderOpen.set(false);
  }
}
