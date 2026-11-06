import { applyChartTheme, getChartTheme, ThemeableChartSpec } from './chart-theme';

describe('getChartTheme(el)', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it('returns the default values when no theme tokens are set', () => {
    expect(getChartTheme(el)).toEqual({
      background: '#fcfcfc',
      font: 'Metropolis',
      titleColor: '#201e3d',
      labelColor: '#4b4b5e',
    });
  });

  it('reads values from the theme tokens', () => {
    el.style.setProperty('--mat-sys-surface-container-low', '#101010');
    el.style.setProperty('--mat-sys-label-medium-font', 'Nunito Sans Variable');
    el.style.setProperty('--mat-sys-on-surface', '#202020');
    el.style.setProperty('--mat-sys-on-secondary-fixed', '#303030');

    expect(getChartTheme(el)).toEqual({
      background: '#101010',
      font: 'Nunito Sans Variable',
      titleColor: '#202020',
      labelColor: '#303030',
    });
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
