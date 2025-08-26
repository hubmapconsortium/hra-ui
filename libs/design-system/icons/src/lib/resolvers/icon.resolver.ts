import { Location } from '@angular/common';
import { assertInInjectionContext, inject } from '@angular/core';
import { IconResolver } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { injectAssetHref } from '@hra-ui/common/url';
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

  const { joinWithSlash } = Location;
  const assetHref = injectAssetHref();
  const directory = inject(SVG_ICON_DIRECTORY);
  const sanitizer = inject(DomSanitizer);
  return (name, namespace) => {
    let path = joinWithSlash(assetHref(), directory);
    path = joinWithSlash(path, namespace);
    path = joinWithSlash(path, `${name}.svg`);
    return sanitizer.bypassSecurityTrustResourceUrl(path);
  };
}
