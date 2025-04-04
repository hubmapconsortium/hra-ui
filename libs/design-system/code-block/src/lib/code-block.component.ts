import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

/**
 * Component representing a code block.
 * Displays code with syntax highlighting.
 */
@Component({
  selector: 'hra-code-block',
  standalone: true,
  imports: [CommonModule, HighlightModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  /** Code for the code block */
  readonly code = input.required<string>();
  /** Language for the code block */
  readonly language = input.required<string>();
}
