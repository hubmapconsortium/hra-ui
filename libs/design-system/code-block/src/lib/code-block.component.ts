import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight, HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'hra-code-block',
  standalone: true,
  imports: [CommonModule, Highlight, HighlightModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input.required<string>();
}
