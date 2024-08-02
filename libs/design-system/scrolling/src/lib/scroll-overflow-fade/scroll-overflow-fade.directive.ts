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
import { NG_SCROLLBAR } from 'ngx-scrollbar';
import { SCROLL_TIMELINE, ScrollTimelineFunc } from '../scroll-timeline/scroll-timeline';

/** Keyframes for the top gradient */
const GRADIENT_TOP_KEYFRAMES: Keyframe[] = [
  {
    top: 'var(--_hra-scroll-overflow-fade-gradient-top-start)',
    opacity: 0,
  },
  {
    offset: 0.02,
    opacity: 1,
  },
  {
    top: 'var(--_hra-scroll-overflow-fade-gradient-top-end)',
  },
];

/** Keyframes for the bottom gradient */
const GRADIENT_BOTTOM_KEYFRAMES: Keyframe[] = [
  {
    top: 'var(--_hra-scroll-overflow-fade-gradient-bottom-start)',
  },
  {
    offset: 0.98,
    opacity: 1,
  },
  {
    top: 'var(--_hra-scroll-overflow-fade-gradient-bottom-end)',
    opacity: 0,
  },
];

/** Scroll overflow fade global styles component */
@Component({
  selector: 'hra-scroll-overflow-fade-styles',
  standalone: true,
  template: '',
  styleUrls: ['./scroll-overflow-fade.directive.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollOverflowFadeStylesComponent {}

/**
 * Directive that can be used along ng-scrollbar to apply a gradient
 * to the top and bottom of the scroll area to indicate that there
 * is additional content available through scrolling.
 */
@Directive({
  selector: '[hraScrollOverflowFade]',
  standalone: true,
  host: {
    '[style.--hra-scroll-overflow-fade-offset.px]': 'scrollOverflowFadeOffset()',
  },
})
export class ScrollOverflowFadeDirective {
  /**
   * Additional offset to the gradient elements.
   * Primarily useful when there are sticky headers on a table, etc.
   */
  readonly scrollOverflowFadeOffset = input(0, { transform: numberAttribute });

  /** Renderer instance */
  private readonly renderer = inject(Renderer2);
  /** Nearest ng-scrollbar instance */
  private readonly scrollbar = inject(NG_SCROLLBAR);
  /** Signal providing access to ScrollTimeline though browser builtin or polyfill */
  private readonly scrollTimeline = inject(SCROLL_TIMELINE);

  /**
   * Initializes the directive, adding the gradient elements to the scroll area.
   */
  constructor() {
    registerStyleComponents([ScrollOverflowFadeStylesComponent]);

    effect((onCleanup) => {
      const scrollTimeline = this.scrollTimeline();
      if (!this.scrollbar.viewport.initialized() || !scrollTimeline) {
        return;
      }

      const viewport = this.scrollbar.viewport.nativeElement;
      const cleanupFns = [
        this.attachGradient(viewport, 'top', scrollTimeline, GRADIENT_TOP_KEYFRAMES),
        this.attachGradient(viewport, 'bottom', scrollTimeline, GRADIENT_BOTTOM_KEYFRAMES),
      ];

      onCleanup(() => cleanupFns.forEach((fn) => fn()));
    });
  }

  /**
   * Creates and attaches a gradient element to a scroll area.
   *
   * @param viewport The scroll area viewport
   * @param placement Whether to place the gradient on top or bottom
   * @param scrollTimeline Reference to ScrollTimeline
   * @param keyframes Keyframes used to animate/move the gradient
   * @returns A cleanup function
   */
  private attachGradient(
    viewport: HTMLElement,
    placement: 'top' | 'bottom',
    scrollTimeline: ScrollTimelineFunc,
    keyframes: Keyframe[],
  ): () => void {
    const el = this.createGradientElement(placement);
    this.renderer.appendChild(viewport, el);

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
