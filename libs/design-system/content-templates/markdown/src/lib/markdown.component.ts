import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common';
import { MarkdownComponent as NgxMarkdownComponent } from 'ngx-markdown';

/**
 * Markdown wrapper component to load markdown from a source file.
 */
@Component({
  selector: 'hra-markdown',
  imports: [CommonModule, NgxMarkdownComponent, AssetUrlPipe],
  template: `<markdown [data]="data()" [src]="src() ? (src()! | assetUrl) : undefined" />`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent {
  /** Markdown data input */
  readonly data = input<string>();

  /** Markdown source file input */
  readonly src = input<string>();
}
