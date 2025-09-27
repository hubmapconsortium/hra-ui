import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, model, OnInit, output, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Slider for setting opacity on an anatomical structure
 */
@Component({
  selector: 'ccf-opacity-slider',
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
    MatInputModule,
    ButtonsModule,
    PlainTooltipDirective,
  ],
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpacitySliderComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-opacity-slider';

  /** The value displayed in the slider */
  readonly opacity = model(20);
  /** Whether the item is set to visible */
  readonly visible = input(true);

  /** Emits the updated opacity when the opacity changes */
  readonly opacityChange = output<number>();
  /** Emitted when slider visibility is toggled */
  readonly visibilityToggle = output();
  /** Emitter for resetting all opacity values to default */
  readonly opacityReset = output();
  /** Emitted when slider thumb is moved */
  readonly sliderChanged = output<string>();

  /** Previous opacity */
  readonly prevOpacity = signal<number>(0);

  /** Initialize the component */
  ngOnInit(): void {
    if (this.visible()) {
      this.prevOpacity.set(0);
    } else {
      this.prevOpacity.set(20);
    }
  }

  /** Reset previous opacity */
  reset(): void {
    this.prevOpacity.set(20);
  }

  /**
   * Emits signal to toggle the visibility of the item
   */
  toggleVisibility(): void {
    const temp = this.opacity();
    this.opacity.set(this.prevOpacity());
    this.prevOpacity.set(temp);
    this.visibilityToggle.emit();
    this.opacityChange.emit(this.opacity());
  }

  /**
   * Emits signal to reset the opacity of the item
   */
  resetOpacity(): void {
    this.prevOpacity.set(0);
    this.opacityReset.emit();
  }
}
