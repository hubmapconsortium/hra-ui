import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  /** Displayed slider */
  @Input() displayedSlider?: string;
  /** Rotation value */
  @Input() rotation!: Rotation;
  /** Step size to increase or decrease value by */
  @Input() step!: number;

  /** Displayed slider change */
  @Output() readonly displaySlider = new EventEmitter<string>();
  /** Reset rotation */
  @Output() readonly resetRotation = new EventEmitter<string>();
  /** Update rotation */
  @Output() readonly changeRotation = new EventEmitter<string>();
}
