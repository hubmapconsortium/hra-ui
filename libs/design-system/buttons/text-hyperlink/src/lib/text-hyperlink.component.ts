import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TextHyperlinkDirective } from './directives/text-hyperlink.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Text hyperlink component
 */
@Component({
  selector: 'hra-text-hyperlink',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, TextHyperlinkDirective],
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

  /**
   * Text hyperlink component router
   */
  private readonly router = inject(Router, { optional: true });

  /**
   * Text hyperlink component url tree
   */
  protected readonly urlTree = computed(() => {
    const url = this.url();
    if (this.router && URL.parse(url) === null) {
      return this.router.parseUrl(url);
    }
    return undefined;
  });
}
