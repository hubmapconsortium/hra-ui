import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common';

/**
 * Component for displaying an image in the content template
 */
@Component({
  selector: 'hra-image',
  imports: [CommonModule, AssetUrlPipe],
  template: '<img [src]="src() | assetUrl" [alt]="alt()"/>',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  /** Image src */
  readonly src = input.required<string>();

  /** Image alt text */
  readonly alt = input<string>();
}
