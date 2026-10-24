import { DOCUMENT } from '@angular/common';
import { ApplicationRef, computed, effect, inject, Injectable, signal } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';

/** Color theme */
export type Theme = 'light' | 'dark';

/** Local storage key for the theme picked with the theme toggle */
export const THEME_STORAGE_KEY = 'cde-ui-theme';

/**
 * Switches between the light and dark themes.
 * Follows the system color scheme until the other theme is picked,
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

  /** Theme picked with the toggle, or undefined to follow the system */
  private readonly pickedTheme = signal<Theme | undefined>(this.loadPickedTheme());

  /** Theme in effect */
  readonly theme = computed(() => this.pickedTheme() ?? this.systemTheme());

  /** Applies the picked theme. Without one, the stylesheet's `color-scheme: light dark` follows the system. */
  constructor() {
    effect(() => {
      this.document.documentElement.style.colorScheme = this.pickedTheme() ?? '';
    });
  }

  /**
   * Switches to the opposite theme. Switching back to the system theme forgets the pick.
   * Where view transitions are supported, the page keeps showing the old theme until everything,
   * including the charts that redraw in the new colors, has updated, then switches all at once.
   */
  toggle(): void {
    const theme = this.theme() === 'dark' ? 'light' : 'dark';
    const picked = theme === this.systemTheme() ? undefined : theme;
    const apply = () => {
      this.pickedTheme.set(picked);
      this.savePickedTheme(picked);
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
