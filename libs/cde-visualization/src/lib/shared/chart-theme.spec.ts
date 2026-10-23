import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { applyChartTheme, getChartTheme, ThemeableChartSpec, watchColorScheme } from './chart-theme';

describe('getChartTheme(el)', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
    jest.restoreAllMocks();
  });

  it('returns the default values when the theme colors cannot be resolved', () => {
    expect(getChartTheme(el)).toEqual({
      background: '#fcfcfc',
      font: 'Metropolis',
      titleColor: '#201e3d',
      labelColor: '#4b4b5e',
    });
  });

  it('reads the font token and resolves the color tokens', () => {
    // jsdom does not resolve CSS variables, so stand in for the browser's computed colors
    const resolvedColors: Record<string, string> = {
      'var(--mat-sys-surface-container-low, #fcfcfc)': 'rgb(16, 16, 16)',
      'var(--mat-sys-on-surface, #201e3d)': 'rgb(32, 32, 32)',
      'var(--mat-sys-on-surface-variant, #4b4b5e)': 'rgb(48, 48, 48)',
    };
    const getComputedStyleImpl = window.getComputedStyle;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((target) => {
      const color = (target as HTMLElement).style.color;
      return color in resolvedColors
        ? ({ color: resolvedColors[color] } as CSSStyleDeclaration)
        : getComputedStyleImpl(target);
    });
    el.style.setProperty('--mat-sys-label-medium-font', 'Nunito Sans Variable');

    expect(getChartTheme(el)).toEqual({
      background: 'rgb(16, 16, 16)',
      font: 'Nunito Sans Variable',
      titleColor: 'rgb(32, 32, 32)',
      labelColor: 'rgb(48, 48, 48)',
    });
    expect(el.children).toHaveLength(0);
  });
});

describe('applyChartTheme(spec, theme)', () => {
  it('sets the background, font, and axis colors', () => {
    const spec: ThemeableChartSpec = {
      background: '',
      config: { font: '', axis: { titleColor: '', labelColor: '' } },
    };
    applyChartTheme(spec, { background: '#101010', font: 'Inter', titleColor: '#202020', labelColor: '#303030' });

    expect(spec).toEqual({
      background: '#101010',
      config: { font: 'Inter', axis: { titleColor: '#202020', labelColor: '#303030' } },
    });
  });
});

describe('watchColorScheme()', () => {
  const root = document.documentElement;
  let systemPrefersDark$: BehaviorSubject<BreakpointState>;

  beforeEach(() => {
    systemPrefersDark$ = new BehaviorSubject<BreakpointState>({ matches: false, breakpoints: {} });
    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointObserver, useValue: { observe: () => systemPrefersDark$ } }],
    });

    // jsdom does not compute color-scheme, so read it from a test attribute
    const getComputedStyleImpl = window.getComputedStyle;
    jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation((target) =>
        target === root
          ? ({ colorScheme: root.getAttribute('data-color-scheme') ?? 'normal' } as CSSStyleDeclaration)
          : getComputedStyleImpl(target),
      );
  });

  afterEach(() => {
    root.removeAttribute('data-color-scheme');
    jest.restoreAllMocks();
  });

  it('changes when the system color scheme preference changes', () => {
    const colorScheme = TestBed.runInInjectionContext(() => watchColorScheme());
    const initial = colorScheme();

    systemPrefersDark$.next({ matches: true, breakpoints: {} });
    expect(colorScheme()).not.toEqual(initial);
  });

  it('changes when the color scheme of the root element changes', async () => {
    const colorScheme = TestBed.runInInjectionContext(() => watchColorScheme());
    const initial = colorScheme();

    root.setAttribute('data-color-scheme', 'dark');
    await Promise.resolve();
    expect(colorScheme()).not.toEqual(initial);
  });
});
