import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Axis, Rotation } from '../rotation-slider.component';

@Component({
  selector: 'ccf-slider-box',
  templateUrl: './slider-box.component.html',
  styleUrl: './slider-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderBoxComponent {
  @Input() sliderAxis!: Axis;
  @Input() displayedSlider?: string;
  @Input() rotation!: Rotation;
  @Input() step!: number;

  @Output() readonly displaySlider = new EventEmitter<string>();
  @Output() readonly resetRotation = new EventEmitter<string>();
  @Output() readonly changeRotation = new EventEmitter<string>();
}
