import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { TextHyperlinkDirective } from './directives/text-hyperlink.directive';

/**
 * Text hyperlink component
 */
@Component({
  selector: 'hra-text-hyperlink',
  imports: [CommonModule, LinkDirective, MatButtonModule, MatIconModule, TextHyperlinkDirective],
  templateUrl: './text-hyperlink.component.html',
  styleUrl: './text-hyperlink.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextHyperlinkComponent {
  /**
   * Text hyperlink component text
   */
  readonly text = input.required<string>();

  /**
   * Text hyperlink component href
   */
  readonly url = input.required<string>();

  /**
   * Text hyperlink component icon
   */
  readonly icon = input<string>();
}
