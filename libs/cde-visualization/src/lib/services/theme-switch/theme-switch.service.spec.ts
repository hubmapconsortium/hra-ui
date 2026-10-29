import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { THEME_SWITCH_TRANSITION_CLASS, ThemeSwitchService } from './theme-switch.service';

describe('ThemeSwitchService', () => {
  const root = document.documentElement;
  let el: HTMLElement;
  let pageTheme: 'light' | 'dark';

  function setup(): ThemeSwitchService {
    TestBed.configureTestingModule({
      providers: [
        ThemeSwitchService,
        { provide: ElementRef, useValue: new ElementRef(el) },
        {
          provide: BreakpointObserver,
          useValue: { observe: () => new BehaviorSubject<BreakpointState>({ matches: false, breakpoints: {} }) },
        },
      ],
    });
    return TestBed.inject(ThemeSwitchService);
  }

  function overlayColorScheme(): string {
    return TestBed.inject(OverlayContainer).getContainerElement().style.colorScheme;
  }

  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
    pageTheme = 'light';

    // jsdom does not resolve light-dark(), so resolve the probe color from the test's page theme
    const getComputedStyleImpl = window.getComputedStyle;
    jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation((target) =>
        target instanceof HTMLSpanElement
          ? ({ color: pageTheme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' } as CSSStyleDeclaration)
          : getComputedStyleImpl(target),
      );
  });

  afterEach(() => {
    el.remove();
    root.classList.remove(THEME_SWITCH_TRANSITION_CLASS);
    jest.restoreAllMocks();
  });

  it('starts on the page theme', () => {
    pageTheme = 'dark';
    const service = setup();

    expect(service.preference()).toEqual('system');
    expect(service.theme()).toEqual('dark');
    expect(el.style.colorScheme).toEqual('');
  });

  it('switches the element and the overlay container to a theme, then back to the page theme', () => {
    const service = setup();

    service.setPreference('dark');
    expect(service.theme()).toEqual('dark');
    expect(el.style.colorScheme).toEqual('dark');
    expect(overlayColorScheme()).toEqual('dark');

    service.setPreference('system');
    expect(service.theme()).toEqual('light');
    expect(el.style.colorScheme).toEqual('');
    expect(overlayColorScheme()).toEqual('');
  });

  it('switches in a view transition with its own fade timing where supported', async () => {
    let finish!: () => void;
    const finished = new Promise<void>((resolve) => (finish = resolve));
    const startViewTransition = jest.fn((update: () => Promise<void>) => {
      update();
      return { finished } as ViewTransition;
    });
    document.startViewTransition = startViewTransition as unknown as Document['startViewTransition'];
    const service = setup();

    try {
      service.setPreference('system');
      expect(startViewTransition).not.toHaveBeenCalled();

      service.setPreference('dark');
      expect(startViewTransition).toHaveBeenCalledTimes(1);
      expect(service.theme()).toEqual('dark');
      expect(root).toHaveClass(THEME_SWITCH_TRANSITION_CLASS);

      finish();
      await finished;
      await Promise.resolve();
      expect(root).not.toHaveClass(THEME_SWITCH_TRANSITION_CLASS);
    } finally {
      delete (document as Partial<Document>).startViewTransition;
    }
  });
});
