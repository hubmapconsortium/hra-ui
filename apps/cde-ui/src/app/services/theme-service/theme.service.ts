import { DOCUMENT } from '@angular/common';
import { ApplicationRef, computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';

/** Color theme */
export type Theme = 'light' | 'dark';

/** Theme menu choice: the system color scheme, or the light or dark theme */
export type ThemePreference = 'system' | Theme;

/** Local storage key for the theme picked in the theme menu */
export const THEME_STORAGE_KEY = 'cde-ui-theme';

/**
 * Switches between the system color scheme and the light and dark themes.
 * Follows the system color scheme until the light or dark theme is picked,
 * and remembers that pick across page loads.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /** Document whose root element gets the picked color scheme */
  private readonly document = inject(DOCUMENT);

  /** Application, used to wait until every view has updated to the new theme */
  private readonly appRef = inject(ApplicationRef);

  /** Whether the system prefers dark colors */
  private readonly systemPrefersDark = watchBreakpoint('(prefers-color-scheme: dark)');

  /** System theme */
  private readonly systemTheme = computed<Theme>(() => (this.systemPrefersDark() ? 'dark' : 'light'));

  /** Theme menu choice, writable */
  private readonly preferenceSignal = signal<ThemePreference>(this.loadPickedTheme() ?? 'system');

  /** Theme menu choice */
  readonly preference = this.preferenceSignal.asReadonly();

  /** Theme in effect */
  readonly theme = computed(() => {
    const preference = this.preference();
    return preference === 'system' ? this.systemTheme() : preference;
  });

  /** Applies the picked theme. With System settings, the stylesheet's `color-scheme: light dark` follows the system. */
  constructor() {
    effect(() => {
      const preference = this.preference();
      this.document.documentElement.style.colorScheme = preference === 'system' ? '' : preference;
    });
  }

  /**
   * Switches to a theme menu choice. System settings forgets the stored pick.
   * Where view transitions are supported, the page keeps showing the old theme until everything,
   * including the charts that redraw in the new colors, has updated, then switches all at once.
   *
   * @param preference Theme menu choice
   */
  setPreference(preference: ThemePreference): void {
    if (preference === untracked(this.preference)) {
      return;
    }

    const apply = () => {
      this.preferenceSignal.set(preference);
      this.savePickedTheme(preference === 'system' ? undefined : preference);
    };

    if (typeof this.document.startViewTransition !== 'function') {
      apply();
      return;
    }

    this.document.startViewTransition(async () => {
      apply();
      await this.appRef.whenStable();
    });
  }

  /**
   * Reads the picked theme from local storage
   *
   * @returns The picked theme, or undefined if none is stored
   */
  private loadPickedTheme(): Theme | undefined {
    try {
      const value = localStorage.getItem(THEME_STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Stores the picked theme in local storage
   *
   * @param theme Theme to store, or undefined to remove the stored theme
   */
  private savePickedTheme(theme: Theme | undefined): void {
    try {
      if (theme) {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch {
      // Storage is unavailable, for example when site data is blocked. The pick lasts until reload.
    }
  }
}
