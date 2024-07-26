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

@Component({
  selector: 'hra-scroll-overflow-fade-styles',
  standalone: true,
  template: '',
  styleUrls: ['./scroll-overflow-fade.directive.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollOverflowFadeStylesComponent {}

@Directive({
  selector: '[hraScrollOverflowFade]',
  standalone: true,
  host: {
    '[style.--hra-scroll-overflow-fade-offset.px]': 'scrollOverflowFadeOffset()',
  },
})
export class ScrollOverflowFadeDirective {
  readonly scrollOverflowFadeOffset = input(0, { transform: numberAttribute });

  private readonly renderer = inject(Renderer2);
  private readonly scrollbar = inject(NG_SCROLLBAR);
  private readonly scrollTimeline = inject(SCROLL_TIMELINE);

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

  private createGradientElement(placement: 'top' | 'bottom'): HTMLElement {
    const el: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(el, `hra-scroll-overflow-fade-gradient-${placement}`);
    return el;
  }

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
