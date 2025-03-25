import { LocationStrategy } from '@angular/common';
import { assertInInjectionContext, inject, InjectionToken, signal, WritableSignal } from '@angular/core';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';

/** Injection token for the application wide base url for all asset links */
export const APP_ASSETS_HREF = new InjectionToken<WritableSignal<string>>('appAssetsHref', {
  providedIn: 'root',
  factory: () => signal(getDefaultAssetsHref()),
});

/**
 * Get the default assets href
 *
 * @param fileUrl Url of this file/bundle
 * @returns A base url for asset links or the empty string
 */
export function getDefaultAssetsHref(fileUrl = getImportMetaUrl()): string {
  assertInInjectionContext(getDefaultAssetsHref);

  const url = URL.parse('./', fileUrl);
  if (url && ['http:', 'https:'].includes(url.protocol)) {
    return url.href;
  }

  return inject(LocationStrategy).getBaseHref();
}
