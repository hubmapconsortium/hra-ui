import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Component for displaying an image in the content template
 */
@Component({
  selector: 'hra-image',
  imports: [CommonModule],
  template: '<img [src]="src()" [alt]="alt()"/>',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  /** Image src */
  readonly src = input.required<string>();

  /** Image alt text */
  readonly alt = input<string>();
}
