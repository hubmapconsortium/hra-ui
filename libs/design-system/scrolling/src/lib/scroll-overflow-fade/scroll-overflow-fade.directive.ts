import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Renderer2,
  ViewEncapsulation,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { ViewportAdapter } from 'ngx-scrollbar';
import { SCROLL_TIMELINE, ScrollTimelineFunc } from '../scroll-timeline/scroll-timeline';

/** Keyframes for the top gradient: hidden at the start of the scroll range */
const GRADIENT_TOP_KEYFRAMES: Keyframe[] = [{ opacity: 0 }, { offset: 0.02, opacity: 1 }, { opacity: 1 }];

/** Keyframes for the bottom gradient: hidden at the end of the scroll range */
const GRADIENT_BOTTOM_KEYFRAMES: Keyframe[] = [{ opacity: 1 }, { offset: 0.98, opacity: 1 }, { opacity: 0 }];

/** Scroll overflow fade global styles component */
@Component({
  selector: 'hra-scroll-overflow-fade-styles',
  template: '',
  styleUrl: './scroll-overflow-fade.directive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ScrollOverflowFadeStylesComponent {}

/**
 * Directive that can be used along ng-scrollbar to apply a gradient
 * to the top and bottom of the scroll area to indicate that there
 * is additional content available through scrolling.
 *
 * The gradients are sticky children of the content wrapper, so they stay pinned to the viewport edges while scrolling,
 * and the scroll timeline only fades them in and out. ng-scrollbar draws its scrollbars in the content wrapper too,
 * which is its own stacking context, so the gradients have to be there to stay under the scrollbars.
 */
@Directive({
  selector: '[hraScrollOverflowFade]',
  host: {
    '[style.--hra-scroll-overflow-fade-offset.px]': 'scrollOverflowFadeOffset()',
    '[style.--hra-scroll-overflow-fade-bottom-offset.px]': 'scrollOverflowFadeBottomOffset()',
  },
})
export class ScrollOverflowFadeDirective {
  /**
   * Additional offset to the gradient elements.
   * Primarily useful when there are sticky headers on a table, etc.
   */
  readonly scrollOverflowFadeOffset = input(0, { transform: numberAttribute });

  /**
   * Additional offset to the bottom gradient element.
   * Primarily useful when there are sticky footers on a table, etc.
   */
  readonly scrollOverflowFadeBottomOffset = input(0, { transform: numberAttribute });

  /** Renderer instance */
  private readonly renderer = inject(Renderer2);
  /** Viewport adapter of the ng-scrollbar, with or without an external viewport */
  private readonly adapter = inject(ViewportAdapter);
  /** Signal providing access to ScrollTimeline though browser builtin or polyfill */
  private readonly scrollTimeline = inject(SCROLL_TIMELINE);

  /**
   * Initializes the directive, adding the gradient elements to the scroll area.
   */
  constructor() {
    registerStyleComponents([ScrollOverflowFadeStylesComponent]);

    effect((onCleanup) => {
      const scrollTimeline = this.scrollTimeline();
      if (!this.adapter.initialized() || !scrollTimeline) {
        return;
      }

      const { viewportElement: viewport, contentWrapperElement: content } = this.adapter;
      const cleanupFns = [
        this.attachGradient(viewport, content, 'top', scrollTimeline, GRADIENT_TOP_KEYFRAMES),
        this.attachGradient(viewport, content, 'bottom', scrollTimeline, GRADIENT_BOTTOM_KEYFRAMES),
      ];

      onCleanup(() => cleanupFns.forEach((fn) => fn()));
    });
  }

  /**
   * Creates and attaches a gradient element to a scroll area.
   *
   * @param viewport The scroll area viewport, which drives the fade
   * @param content The content wrapper the gradient is added to, next to ng-scrollbar's scrollbars
   * @param placement Whether to place the gradient on top (first child) or bottom (last child)
   * @param scrollTimeline Reference to ScrollTimeline
   * @param keyframes Keyframes used to fade the gradient
   * @returns A cleanup function
   */
  private attachGradient(
    viewport: HTMLElement,
    content: HTMLElement,
    placement: 'top' | 'bottom',
    scrollTimeline: ScrollTimelineFunc,
    keyframes: Keyframe[],
  ): () => void {
    const el = this.createGradientElement(placement);
    if (placement === 'top') {
      this.renderer.insertBefore(content, el, content.firstChild);
    } else {
      this.renderer.appendChild(content, el);
    }

    const animation = this.animateGradient(scrollTimeline, el, viewport, keyframes);
    return () => {
      el.remove();
      animation.cancel();
    };
  }

  /**
   * Creates a new gradient element.
   *
   * @param placement Whether it will be placed on the top or bottom
   * @returns A new element
   */
  private createGradientElement(placement: 'top' | 'bottom'): HTMLElement {
    const el: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(el, `hra-scroll-overflow-fade-gradient-${placement}`);
    return el;
  }

  /**
   * Animates a gradient element using a scroll timeline.
   *
   * @param scrollTimeline Reference to ScrollTimeline
   * @param el Element to animate
   * @param source Scroll container element
   * @param keyframes Keyframe specification
   * @returns An animation
   */
  private animateGradient(
    scrollTimeline: ScrollTimelineFunc,
    el: HTMLElement,
    source: HTMLElement,
    keyframes: Keyframe[],
  ): Animation {
    return el.animate(keyframes, {
      fill: 'both',
      easing: 'linear',
      timeline: new scrollTimeline({ source, axis: 'y' }),
    });
  }
}
