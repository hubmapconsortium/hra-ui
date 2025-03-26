import { InjectionToken, signal, WritableSignal } from '@angular/core';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';
import { getCurrentScriptFromElement, getCurrentScriptFromStackTrace } from './current-script';

/** Injection token for the application wide base url for all asset links */
export const APP_ASSETS_HREF = new InjectionToken<WritableSignal<string>>('appAssetsHref', {
  providedIn: 'root',
  factory: () => signal(getDefaultAssetsHref()),
});

/**
 * Get the default assets href
 *
 * @param candidates Candidate paths
 * @returns A base url for assets or the empty string
 */
export function getDefaultAssetsHref(candidates: Iterable<string | undefined> = getAssetsHrefCandidatePaths()): string {
  for (const path of candidates) {
    const url = URL.parse('./', path);
    if (url && ['http:', 'https:'].includes(url.protocol)) {
      return url.href;
    }
  }

  return '';
}

/**
 * Get candidate paths for assets href
 */
export function* getAssetsHrefCandidatePaths(): Generator<string | undefined> {
  yield getImportMetaUrl();
  yield getCurrentScriptFromElement();
  yield getCurrentScriptFromStackTrace();
}
