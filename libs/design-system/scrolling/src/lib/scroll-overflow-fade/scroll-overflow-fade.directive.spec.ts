import { WritableSignal, signal } from '@angular/core';
import { RenderTemplateOptions, render } from '@testing-library/angular';
import { SCROLL_TIMELINE, ScrollTimelineFunc } from '../scroll-timeline/scroll-timeline';
import { ScrollingModule, provideScrolling } from '../scrolling.module';
import { ScrollOverflowFadeDirective } from './scroll-overflow-fade.directive';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';

describe('ScrollOverflowFadeDirective', () => {
  const template = `
    <ng-scrollbar hraScrollOverflowFade>
      content
    </ng-scrollbar>
  `;

  function getSharedOptions(): RenderTemplateOptions<ScrollOverflowFadeDirective> {
    return {
      imports: [ScrollingModule],
      providers: [provideScrolling(), { provide: SCROLL_TIMELINE, useValue: signal(null) }],
    };
  }

  let restoreHTMLElementAnimate: (() => void) | undefined;
  function setupHTMLElementAnimate(): void {
    const proto = HTMLElement.prototype;
    if (!('animate' in proto)) {
      Object.defineProperty(proto, 'animate', {
        configurable: true,
        writable: true,
        value: jest.fn(() => mock()),
      });

      restoreHTMLElementAnimate = () => {
        delete (proto as { animate?: unknown }).animate;
      };
    }
  }

  beforeEach(() => {
    setupHTMLElementAnimate();
  });

  afterEach(() => {
    restoreHTMLElementAnimate?.();
  });

  it('renders', async () => {
    await expect(render(template, { ...getSharedOptions() })).resolves.toBeDefined();
  });

  it('creates top and bottom gradient elements', async () => {
    const context = await render(template, { ...getSharedOptions() });
    const scrollTimeline = jest.fn().mockReturnValue(undefined);
    const scrollTimelineSignal = TestBed.inject(SCROLL_TIMELINE) as WritableSignal<ScrollTimelineFunc>;

    scrollTimelineSignal.set(scrollTimeline);
    context.detectChanges();

    const topEl = context.container.querySelector('.hra-scroll-overflow-fade-gradient-top');
    expect(topEl).toBeDefined();

    const bottomEl = context.container.querySelector('.hra-scroll-overflow-fade-gradient-bottom');
    expect(bottomEl).toBeDefined();
  });
});
