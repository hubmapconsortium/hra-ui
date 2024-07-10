import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { getCurrentScriptBasePath } from './current-script';

export const INITIAL_APP_HREF = new InjectionToken<string>('InitialAppHref', {
  providedIn: 'root',
  factory: () => getCurrentScriptBasePath(),
});

@Injectable({ providedIn: 'root' })
export class AppHrefService {
  private readonly initialAppHref = inject(INITIAL_APP_HREF);
  private readonly appHrefSignal = signal(this.initialAppHref);

  readonly appHref = this.appHrefSignal.asReadonly();

  setAppHref(href: string): void {
    this.appHrefSignal.set(href);
  }

  resetAppHref(): void {
    this.setAppHref(this.initialAppHref);
  }
}
