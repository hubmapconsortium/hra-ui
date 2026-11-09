import { WritableSignal, signal } from '@angular/core';
import { RenderTemplateOptions, render } from '@testing-library/angular';
import { SCROLL_TIMELINE, ScrollTimelineFunc } from '../scroll-timeline/scroll-timeline';
import { ScrollingModule } from '../scrolling.module';
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
      providers: [{ provide: SCROLL_TIMELINE, useValue: signal(null) }],
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

  it('renders on a scrollbar with an external viewport', async () => {
    const externalViewportTemplate = `
      <ng-scrollbar externalViewport=".viewport" hraScrollOverflowFade>
        <div class="viewport">content</div>
      </ng-scrollbar>
    `;
    await expect(render(externalViewportTemplate, { ...getSharedOptions() })).resolves.toBeDefined();
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

  it('places the gradients at the start and end of the content wrapper, next to the scrollbars', async () => {
    const context = await render(template, { ...getSharedOptions() });
    const scrollTimelineSignal = TestBed.inject(SCROLL_TIMELINE) as WritableSignal<ScrollTimelineFunc>;

    scrollTimelineSignal.set(jest.fn().mockReturnValue(undefined));
    context.detectChanges();

    const content = context.container.querySelector('ng-scrollbar > ng-scroll-content') as HTMLElement;
    expect(content.firstElementChild).toHaveClass('hra-scroll-overflow-fade-gradient-top');
    expect(content.lastElementChild).toHaveClass('hra-scroll-overflow-fade-gradient-bottom');
    expect(content.querySelector(':scope > scrollbars')).not.toBeNull();
  });

  it('sets the top and bottom offsets for sticky headers and footers', async () => {
    const offsetTemplate = `
      <ng-scrollbar hraScrollOverflowFade scrollOverflowFadeOffset="40" scrollOverflowFadeBottomOffset="36">
        content
      </ng-scrollbar>
    `;
    const context = await render(offsetTemplate, { ...getSharedOptions() });

    const scrollbar = context.container.querySelector('ng-scrollbar') as HTMLElement;
    expect(scrollbar.style.getPropertyValue('--hra-scroll-overflow-fade-offset')).toBe('40px');
    expect(scrollbar.style.getPropertyValue('--hra-scroll-overflow-fade-bottom-offset')).toBe('36px');
  });
});
