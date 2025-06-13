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
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkdownComponent {
  /** Markdown data input */
  readonly data = input<string>();

  /** Markdown source file input */
  readonly src = input<string>();
}
