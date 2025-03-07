import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Interface containing slices data of the tissue block
 */
export interface SlicesConfig {
  /** Thickness of each tissue slice */
  thickness: number;
  /** Number of slices in the block */
  numSlices: number;
}

/** Default values for slices config. */
const DEFAULT_SLICES_CONFIG: SlicesConfig = {
  thickness: 0,
  numSlices: 0,
};

/**
 * Component for entering data on block slices
 */
@Component({
  selector: 'ccf-slices-input',
  templateUrl: './slices-input.component.html',
  styleUrls: ['./slices-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SlicesInputComponent {
  private readonly ga = inject(GoogleAnalyticsService);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-slices-input';

  /**
   * Values of block dimensions to be emitted
   */
  @Input() slicesConfig = DEFAULT_SLICES_CONFIG;

  /**
   * Emitter for slice data values
   */
  @Output() readonly slicesConfigChange = new EventEmitter<SlicesConfig>();

  emptyStringIfNaN(value: number): number | string {
    return Number.isNaN(value) ? '' : value;
  }

  /**
   * Limits the length of the input if needed and updates values when an input changes
   *
   * @param input Event from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateSlicesData(input: KeyboardEvent, key: string): void {
    const { value: strValue } = input.target as HTMLInputElement;
    this.slicesConfig = { ...this.slicesConfig, [key]: strValue !== '' ? +strValue : NaN };
    this.ga.event('slice_config_update', 'slice_input', key, this.slicesConfig[key as never]);
    this.slicesConfigChange.emit(this.slicesConfig);
  }

  /**
   * Refreshes all slice data values to empty values
   */
  refreshSlices(): void {
    this.slicesConfig = DEFAULT_SLICES_CONFIG;
    this.ga.event('slice_config_reset', 'slice_input');
    this.slicesConfigChange.emit(this.slicesConfig);
  }
}
