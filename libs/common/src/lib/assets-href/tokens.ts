import { InjectionToken, signal, WritableSignal } from '@angular/core';

export const APP_ASSETS_HREF = new InjectionToken<WritableSignal<string>>('appAssetsHref', {
  providedIn: 'root',
  factory: () => signal(import.meta.resolve('./')),
});
