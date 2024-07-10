import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { getCurrentScriptBasePath } from './current-script';

/** Initial value for appHref. Defaults to the current script's base path */
export const INITIAL_APP_HREF = new InjectionToken<string>('InitialAppHref', {
  providedIn: 'root',
  factory: () => getCurrentScriptBasePath(),
});

/**
 * Service for getting and setting the appHref
 */
@Injectable({ providedIn: 'root' })
export class AppHrefService {
  /** Initial appHref value */
  private readonly initialAppHref = inject(INITIAL_APP_HREF);
  /** Current appHref value signal */
  private readonly appHrefSignal = signal(this.initialAppHref);

  /** Readonly appHref value signal */
  readonly appHref = this.appHrefSignal.asReadonly();

  /**
   * Updates the current appHref value
   *
   * @param href New appHref value
   */
  setAppHref(href: string): void {
    this.appHrefSignal.set(href);
  }

  /**
   * Resets the appHref to it's initial value
   */
  resetAppHref(): void {
    this.setAppHref(this.initialAppHref);
  }
}
