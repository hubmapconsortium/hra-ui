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

const GRADIENT_KEYFRAMES: Keyframe[] = [
  {
    top: 'calc(var(--viewport-height) * 1px - var(--_hra-scroll-overflow-fade-height))',
  },
  {
    offset: 0.98,
    opacity: 1,
  },
  {
    top: 'calc(var(--content-height) * 1px - var(--_hra-scroll-overflow-fade-height) + var(--hra-scroll-overflow-fade-offset))',
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
      const el = this.createGradientElement();

      this.renderer.appendChild(viewport, el);
      const animation = this.animateGradient(scrollTimeline, el, viewport);

      onCleanup(() => {
        el.remove();
        animation.cancel();
      });
    });
  }

  private createGradientElement(): HTMLElement {
    const el: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(el, 'hra-scroll-overflow-fade-gradient');
    return el;
  }

  private animateGradient(scrollTimeline: ScrollTimelineFunc, el: HTMLElement, source: HTMLElement): Animation {
    return el.animate(GRADIENT_KEYFRAMES, {
      fill: 'both',
      easing: 'linear',
      timeline: new scrollTimeline({ source, axis: 'y' }),
    });
  }
}
