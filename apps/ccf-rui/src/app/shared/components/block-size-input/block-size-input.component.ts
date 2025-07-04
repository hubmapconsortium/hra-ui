import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Interface for objects containing tissue block dimensions
 */
export interface BlockSize {
  /** Width of block */
  x: number;
  /** Height of block */
  y: number;
  /** Depth of block */
  z: number;
}

/** Defaults for block sizes. */
const DEFAULT_BLOCK_SIZE: BlockSize = {
  x: 10,
  y: 10,
  z: 10,
};

/**
 * Component for entering dimensions of the tissue block
 */
@Component({
  selector: 'ccf-block-size-input',
  templateUrl: './block-size-input.component.html',
  styleUrls: ['./block-size-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlockSizeInputComponent {
  private readonly ga = inject(GoogleAnalyticsService);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-block-size-input';

  /**
   * Values of block dimensions to be emitted
   */
  @Input() blockSize = DEFAULT_BLOCK_SIZE;

  /**
   * Emitter for values
   */
  @Output() readonly blockSizeChange = new EventEmitter<BlockSize>();

  /**
   * Updates values when an input changes
   *
   * @param input Event from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateBlockSizes(input: KeyboardEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.blockSize = { ...this.blockSize, [key]: +inputTarget.value };
    this.ga.event('block_size_change', 'block_size_input', key, this.blockSize[key as never]);
    this.blockSizeChange.emit(this.blockSize);
  }

  /**
   * Refreshes all block size values to 10
   */
  refreshBlockSize(): void {
    this.blockSize = DEFAULT_BLOCK_SIZE;
    this.ga.event('block_size_reset', 'block_size_input');
    this.blockSizeChange.emit(this.blockSize);
  }
}
