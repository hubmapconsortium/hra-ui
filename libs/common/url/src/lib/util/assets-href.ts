import { getImportMetaUrl } from '@hra-ui/common/import-meta';
import { parseUrl } from './parse-url';
import { getCurrentScriptFromElement, getCurrentScriptFromStackTrace } from './script-detection';

/**
 * Get candidate paths for assets href
 */
function getAssetsHrefCandidatePaths(): Generator<string | undefined> {
  return (function* () {
    yield getImportMetaUrl();
    yield getCurrentScriptFromElement();
    yield getCurrentScriptFromStackTrace();
  })();
}

/**
 * Get the default assets href
 *
 * @param candidates Candidate paths
 * @returns A base url for assets or the empty string
 */
export function getDefaultAssetsHref(candidates: Iterable<string | undefined> = getAssetsHrefCandidatePaths()): string {
  for (const path of candidates) {
    const url = parseUrl('./', path);
    if (url && ['http:', 'https:'].includes(url.protocol)) {
      return url.href;
    }
  }

  return '';
}
