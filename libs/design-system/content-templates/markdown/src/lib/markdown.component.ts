import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { injectLogEvent } from '@hra-ui/common/analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AssetUrlPipe } from '@hra-ui/common/url';
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

  /** Component's host element */
  private readonly hostEl = inject(ElementRef).nativeElement as Element;
  /** Dom renderer reference */
  private readonly renderer = inject(Renderer2);
  /** Analytics event logger */
  private readonly logEvent = injectLogEvent();

  /** List of unlisten functions */
  private listeners: (() => void)[] = [];

  /** Attach cleanup on component destruction */
  constructor() {
    inject(DestroyRef).onDestroy(() => this.clearEventListeners());
  }

  /** Attach event listeners to rendered markdown content */
  attachEventListeners(): void {
    this.attachAnchorClickListeners();
  }

  /** Clear all active event listeners from the markdown */
  clearEventListeners(): void {
    this.listeners.forEach((unlisten) => unlisten());
    this.listeners = [];
  }

  /** Attach click event listeners to all anchor tags in the markdown */
  private attachAnchorClickListeners(): void {
    const { hostEl, listeners, logEvent, renderer } = this;
    const elems = hostEl.querySelectorAll('a');
    const onClick = (event: PointerEvent) =>
      logEvent(CoreEvents.Click, {
        trigger: 'click',
        triggerData: event,
      });

    elems.forEach((el) => listeners.push(renderer.listen(el, 'click', onClick)));
  }
}
