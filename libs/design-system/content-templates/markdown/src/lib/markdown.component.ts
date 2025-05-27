import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'hra-markdown',
  imports: [CommonModule, MarkdownComponent, AssetUrlPipe],
  template: `<markdown [data]="data() ? data() : undefined" [src]="src() ? (src() | assetUrl) : undefined" />`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraMarkdownComponent {
  readonly data = input<string>('');
  readonly src = input<string>('');
}
