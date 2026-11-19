import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Link that lets keyboard and assistive technology users skip to the main content.
 * Hidden off-screen until it receives focus.
 * Mirrors AtlasNG's skip-to-content button so apps can switch to it later.
 */
@Component({
  selector: 'hra-skip-to-content-button',
  imports: [MatIconModule],
  templateUrl: './skip-to-content-button.component.html',
  styleUrl: './skip-to-content-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipToContentButtonComponent {
  /** ID of the element to skip to */
  readonly anchorId = input.required<string>();

  /** Link text */
  readonly label = input('Skip to main content');

  /** Fragment link to the target, shown on hover and used when the link is copied */
  protected readonly href = computed(() => `#${this.anchorId()}`);

  /** Document used to look up the target element */
  private readonly document = inject(DOCUMENT);

  /**
   * Moves focus to the target and scrolls it into view.
   *
   * The default navigation is prevented because a fragment `href` resolves against `<base href>`,
   * which would leave the current route on any page but the root. A target that can't receive
   * focus gets `tabindex="-1"`, so focus can move to it without adding it to the tab order.
   *
   * @param event Click event from the link
   */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    const target = this.document.getElementById(this.anchorId());
    if (!target) {
      return;
    }

    if (!target.hasAttribute('tabindex') && target.tabIndex < 0) {
      target.setAttribute('tabindex', '-1');
    }

    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  }
}
