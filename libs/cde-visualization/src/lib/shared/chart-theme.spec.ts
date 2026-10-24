import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { BehaviorSubject } from 'rxjs';
import { View } from 'vega';
import {
  applyChartTheme,
  ChartTheme,
  getChartTheme,
  ThemeableChartSpec,
  updateChartTheme,
  watchColorScheme,
} from './chart-theme';

const theme: ChartTheme = {
  background: '#101010',
  font: 'Inter',
  fontSize: 13,
  fontWeight: 450,
  lineHeight: 19,
  titleColor: '#202020',
  labelColor: '#303030',
  gridColor: '#404040',
  markColor: '#505050',
};

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

  it('returns the default values when the theme tokens cannot be resolved', () => {
    expect(getChartTheme(el)).toEqual({
      background: '#fcfcfc',
      font: 'Metropolis',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 21,
      titleColor: '#201e3d',
      labelColor: '#4b4b5e',
      gridColor: '#dddddd',
      markColor: '#000000',
    });
  });

  it('resolves the body medium type token and the color tokens to hex colors', () => {
    // jsdom does not resolve CSS variables, so stand in for the browser's computed styles
    const resolvedFont = { fontFamily: 'Inter', fontSize: '13px', fontWeight: '450', lineHeight: '19px' };
    const resolvedColors: Record<string, string> = {
      'var(--mat-sys-background, #fcfcfc)': 'rgb(16, 16, 16)',
      'var(--mat-sys-on-surface, #201e3d)': 'rgb(32, 32, 32)',
      'var(--mat-sys-on-surface-variant, #4b4b5e)': 'rgb(48, 48, 48)',
      'var(--mat-sys-outline-variant, #dddddd)': 'rgb(64, 64, 64)',
      'var(--mat-sys-on-surface, #000000)': 'rgba(80, 80, 80, 1)',
    };
    const getComputedStyleImpl = window.getComputedStyle;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((target) => {
      const color = (target as HTMLElement).style.color;
      if (color in resolvedColors) {
        return { color: resolvedColors[color] } as CSSStyleDeclaration;
      }
      // The font probe is the only probe without a color
      return target.parentElement === el ? (resolvedFont as CSSStyleDeclaration) : getComputedStyleImpl(target);
    });

    expect(getChartTheme(el)).toEqual(theme);
    expect(el.children).toHaveLength(0);
  });
});

describe('applyChartTheme(spec, theme)', () => {
  it('sets the font, the axis and header type, and the theme color params, and leaves other params alone', () => {
    const spec: ThemeableChartSpec = {
      params: [
        { name: 'colors', value: [] },
        { name: 'themeBackground', value: '' },
        { name: 'themeTitleColor', value: '' },
        { name: 'themeLabelColor', value: '' },
        { name: 'themeGridColor', value: '' },
        { name: 'themeMarkColor', value: '' },
      ],
      config: { font: '', axis: { labelFontSize: 12 } },
    };
    applyChartTheme(spec, theme);

    const text = {
      labelFontSize: 13,
      titleFontSize: 13,
      labelFontWeight: 450,
      titleFontWeight: 450,
      labelLineHeight: 19,
      titleLineHeight: 19,
    };
    expect(spec).toEqual({
      params: [
        { name: 'colors', value: [] },
        { name: 'themeBackground', value: '#101010' },
        { name: 'themeTitleColor', value: '#202020' },
        { name: 'themeLabelColor', value: '#303030' },
        { name: 'themeGridColor', value: '#404040' },
        { name: 'themeMarkColor', value: '#505050' },
      ],
      config: { font: 'Inter', axis: text, header: text },
    });
  });
});

describe('updateChartTheme(view, theme)', () => {
  it('sets the theme color signals and runs the view', () => {
    const view = mock<View>();
    view.signal.mockReturnThis();
    updateChartTheme(view, theme);

    expect(view.signal.mock.calls).toEqual([
      ['themeBackground', '#101010'],
      ['themeTitleColor', '#202020'],
      ['themeLabelColor', '#303030'],
      ['themeGridColor', '#404040'],
      ['themeMarkColor', '#505050'],
    ]);
    expect(view.run).toHaveBeenCalled();
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
