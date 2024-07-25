import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  Injector,
  Renderer2,
  Signal,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { NG_SCROLLBAR } from 'ngx-scrollbar';
import { endWith, interval, map, takeWhile } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

type ScrollTimelineFunc = new (opts: { source: HTMLElement; axis: 'x' | 'y' }) => AnimationTimeline;

const SCROLL_TIMELINE = new InjectionToken<Signal<ScrollTimelineFunc | null>>('SCROLL_TIMELINE', {
  providedIn: 'root',
  factory: () => {
    const globals = globalThis as unknown as { ScrollTimeline: ScrollTimelineFunc };
    const check$ = interval(100).pipe(
      takeWhile(() => !('ScrollTimeline' in globalThis)),
      map(() => false),
      endWith(true),
      map((available) => (available ? globals.ScrollTimeline : null)),
    );

    return toSignal(check$, { initialValue: null });
  },
});

@Component({
  selector: 'hra-scroll-overflow-fade',
  standalone: true,
  template: '',
  styleUrl: './scroll-overflow-fade.directive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'dir.fadeHeight()',
    '[style.background]': 'background()',
  },
})
export class ScrollOverflowFadeComponent {
  protected readonly dir = inject(ScrollOverflowFadeDirective);
  protected readonly background = computed(() => `linear-gradient(to top, ${this.dir.fadeColor()}, transparent)`);

  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const viewport = inject(NG_SCROLLBAR).viewport;
    const scrollTimeline = inject(SCROLL_TIMELINE)() as ScrollTimelineFunc;

    effect((onCleanup) => {
      const { fadeHeight, fadeTopOffset, fadeBottomOffset } = this.dir;
      const animation = element.animate(
        [
          {
            top: `calc(var(--viewport-height) * 1px + ${fadeTopOffset() - fadeHeight()}px)`,
          },
          {
            offset: 0.98,
            opacity: 1,
          },
          {
            top: `calc(var(--content-height) * 1px + ${fadeBottomOffset() - fadeHeight()}px)`,
            opacity: 0,
          },
        ],
        {
          fill: 'both',
          easing: 'linear',
          timeline: new scrollTimeline({ source: viewport.nativeElement, axis: 'y' }),
        },
      );

      onCleanup(() => animation.cancel());
    });
  }
}

@Directive({
  selector: '[hraScrollOverflowFade]',
  standalone: true,
})
export class ScrollOverflowFadeDirective {
  readonly fadeHeight = input(32, { transform: numberAttribute });
  readonly fadeTopOffset = input(0, { transform: numberAttribute });
  readonly fadeBottomOffset = input(0, { transform: numberAttribute });
  readonly fadeColor = input('#ffffff');

  constructor() {
    const viewport = inject(NG_SCROLLBAR).viewport;
    const injector = inject(Injector);
    const viewContainer = inject(ViewContainerRef);
    const renderer = inject(Renderer2);
    const scrollTimeline = inject(SCROLL_TIMELINE);

    effect((onCleanup) => {
      if (viewport.initialized() && scrollTimeline()) {
        const componentRef = viewContainer.createComponent(ScrollOverflowFadeComponent, { injector });
        renderer.appendChild(viewport.nativeElement, componentRef.location.nativeElement);
        onCleanup(() => componentRef.destroy());
      }
    });

    console.log(this);
  }
}
