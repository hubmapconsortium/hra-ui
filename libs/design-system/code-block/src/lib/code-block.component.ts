import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'hra-code-block',
  standalone: true,
  imports: [CommonModule, HighlightModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input.required<string>();
}
