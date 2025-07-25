import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { ConnectedPosition } from '@angular/cdk/overlay';
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
  @Input() sliderAxis!: Axis;
  /** Rotation value */
  @Input() rotation!: Rotation;
  /** Step size to increase or decrease value by */
  @Input() step!: number;
  /** Reset rotation */
  @Output() readonly resetRotation = new EventEmitter<string>();
  /** Update rotation */
  @Output() readonly changeRotation = new EventEmitter<string>();

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
