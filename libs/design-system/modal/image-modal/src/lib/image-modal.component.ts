import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

/**
 * Modal to display an image with a title.
 */
@Component({
  selector: 'hra-image-modal',
  imports: [HraCommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageModalComponent {
  /** Label to display as the modal title */
  readonly modalTitle = input.required<string>();

  /** URL of the image to display */
  readonly imageUrl = input.required<string>();

  /** Alt text for the image */
  readonly altText = input<string>('');

  /** Emits when close icon clicked */
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly close = output<void>();
}
