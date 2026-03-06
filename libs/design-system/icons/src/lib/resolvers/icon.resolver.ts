import { assertInInjectionContext, inject } from '@angular/core';
import { IconResolver } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { assetUrl } from '@hra-ui/common/url';
import { joinWithSlashes } from '@hra-ui/utils/paths';
import { SVG_ICON_DIRECTORY } from '../utils/tokens';

/**
 * Creates a new resolver that resolves svg icons by
 * concatenating the svg icon directory with the icon
 * namespace and name.
 *
 * @returns An icon resolver
 */
export function createSvgIconResolver(): IconResolver {
  assertInInjectionContext(createSvgIconResolver);

  const directory = inject(SVG_ICON_DIRECTORY);
  const sanitizer = inject(DomSanitizer);
  const baseUrl = assetUrl(directory);
  return (name, namespace) => {
    const path = joinWithSlashes(baseUrl(), namespace, `${name}.svg`);
    return sanitizer.bypassSecurityTrustResourceUrl(path);
  };
}
