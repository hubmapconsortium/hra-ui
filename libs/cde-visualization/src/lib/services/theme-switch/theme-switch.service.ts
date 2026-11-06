import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef, computed, ElementRef, inject, Injectable, signal, untracked } from '@angular/core';
import { watchPageColorScheme } from '../../shared/color-scheme';

/** Color theme */
export type Theme = 'light' | 'dark';

/** Theme menu choice: the page's theme (System settings), or the light or dark theme */
export type ThemePreference = 'system' | Theme;

/**
 * Class on the document's root element while a theme change's view transition runs,
 * so its fade timing doesn't change the page's own view transitions
 */
export const THEME_SWITCH_TRANSITION_CLASS = 'cde-visualization-theme-switch';

/** Color that computes to white where the dark theme is in effect, and to black elsewhere */
const THEME_PROBE_COLOR = 'light-dark(rgb(0, 0, 0), rgb(255, 255, 255))';

/**
 * Switches the visualization between the page's theme and the light and dark themes, like cde-ui's header theme menu.
 * It changes only the visualization: the color scheme of the visualization element and of the overlay container
 * that holds its menus, tooltips and fullscreen views, not the page's.
 * It starts on the page's theme and doesn't remember the choice.
 * Provided by the visualization's root component, whose element it switches.
 */
@Injectable()
export class ThemeSwitchService {
  /** Document, whose view transitions fade between the themes */
  private readonly document = inject(DOCUMENT);

  /** Application, used to wait until every view has updated to the new theme */
  private readonly appRef = inject(ApplicationRef);

  /** Visualization element */
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  /** Overlay container, which holds the visualization's menus, tooltips and fullscreen views */
  private readonly overlayContainer = inject(OverlayContainer);

  /** Changes when the page's color scheme might have changed */
  private readonly pageColorScheme = watchPageColorScheme();

  /** Theme the page gives the visualization */
  private readonly pageTheme = computed(() => {
    this.pageColorScheme();
    return this.readPageTheme();
  });

  /** Theme menu choice, writable */
  private readonly preferenceSignal = signal<ThemePreference>('system');

  /** Theme menu choice */
  readonly preference = this.preferenceSignal.asReadonly();

  /** Theme in effect */
  readonly theme = computed(() => {
    const preference = this.preference();
    return preference === 'system' ? this.pageTheme() : preference;
  });

  /**
   * Switches to a theme menu choice. Where view transitions are supported, the visualization keeps showing
   * the old theme until everything, including the charts that redraw in the new colors, has updated,
   * then switches all at once.
   *
   * @param preference Theme menu choice
   */
  setPreference(preference: ThemePreference): void {
    if (preference === untracked(this.preference)) {
      return;
    }

    const colorScheme = preference === 'system' ? '' : preference;
    const apply = () => {
      this.preferenceSignal.set(preference);
      this.el.style.colorScheme = colorScheme;
      this.overlayContainer.getContainerElement().style.colorScheme = colorScheme;
    };

    if (typeof this.document.startViewTransition !== 'function') {
      apply();
      return;
    }

    const root = this.document.documentElement;
    const removeTransitionClass = () => root.classList.remove(THEME_SWITCH_TRANSITION_CLASS);
    root.classList.add(THEME_SWITCH_TRANSITION_CLASS);
    const transition = this.document.startViewTransition(async () => {
      apply();
      await this.appRef.whenStable();
    });
    transition.finished.then(removeTransitionClass, removeTransitionClass);
  }

  /**
   * Reads the theme the page gives the visualization by resolving a `light-dark()` color in the element's parent,
   * which has the page's color scheme but not the theme menu choice
   *
   * @returns The page's theme. Environments that don't resolve `light-dark()`, such as jsdom, get the light theme.
   */
  private readPageTheme(): Theme {
    const parent = this.el.parentElement ?? this.document.documentElement;
    const probe = this.document.createElement('span');
    probe.style.display = 'none';
    probe.style.color = THEME_PROBE_COLOR;
    parent.appendChild(probe);

    const color = getComputedStyle(probe).color;
    probe.remove();
    return color === 'rgb(255, 255, 255)' ? 'dark' : 'light';
  }
}
