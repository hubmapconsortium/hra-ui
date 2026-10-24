import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let systemPrefersDark$: BehaviorSubject<BreakpointState>;
  const root = document.documentElement;

  function setSystemPrefersDark(matches: boolean): void {
    systemPrefersDark$.next({ matches, breakpoints: { '(prefers-color-scheme: dark)': matches } });
  }

  function createService(): ThemeService {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    return service;
  }

  beforeEach(() => {
    systemPrefersDark$ = new BehaviorSubject<BreakpointState>({ matches: false, breakpoints: {} });
    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointObserver, useValue: { observe: () => systemPrefersDark$ } }],
    });
  });

  afterEach(() => {
    localStorage.clear();
    root.style.colorScheme = '';
    jest.restoreAllMocks();
  });

  it('follows the system theme when no theme is picked', () => {
    const service = createService();
    expect(service.theme()).toEqual('light');

    setSystemPrefersDark(true);
    expect(service.theme()).toEqual('dark');
    expect(root.style.colorScheme).toEqual('');
  });

  it('switches to the opposite theme and remembers it', () => {
    const service = createService();
    service.toggle();
    TestBed.tick();

    expect(service.theme()).toEqual('dark');
    expect(root.style.colorScheme).toEqual('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toEqual('dark');
  });

  it('forgets the pick when switching back to the system theme', () => {
    const service = createService();
    service.toggle();
    service.toggle();
    TestBed.tick();

    expect(service.theme()).toEqual('light');
    expect(root.style.colorScheme).toEqual('');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('starts from a stored pick', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const service = createService();

    expect(service.theme()).toEqual('dark');
    expect(root.style.colorScheme).toEqual('dark');
  });

  it('ignores an unknown stored value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    const service = createService();

    expect(service.theme()).toEqual('light');
  });

  it('still switches themes when storage is unavailable', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    const service = createService();
    service.toggle();
    expect(service.theme()).toEqual('dark');
  });

  it('switches themes inside a view transition when the browser supports them', async () => {
    let update: Promise<void> | undefined;
    const startViewTransition = jest.fn((callback: () => Promise<void>) => {
      update = callback();
      return {} as ViewTransition;
    });
    Object.defineProperty(document, 'startViewTransition', { configurable: true, value: startViewTransition });

    try {
      const service = createService();
      service.toggle();
      await update;

      expect(startViewTransition).toHaveBeenCalledTimes(1);
      expect(service.theme()).toEqual('dark');
      expect(root.style.colorScheme).toEqual('dark');
    } finally {
      delete (document as { startViewTransition?: unknown }).startViewTransition;
    }
  });
});
