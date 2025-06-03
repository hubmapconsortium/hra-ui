import { Location } from '@angular/common';
import { assertInInjectionContext, inject } from '@angular/core';
import { IconResolver } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { SVG_ICON_DIRECTORY } from '../utils/tokens';

export function createSvgIconResolver(): IconResolver {
  assertInInjectionContext(createSvgIconResolver);

  const { joinWithSlash } = Location;
  const assetsHref = inject(APP_ASSETS_HREF);
  const directory = inject(SVG_ICON_DIRECTORY);
  const sanitizer = inject(DomSanitizer);
  return (name, namespace) => {
    let path = joinWithSlash(assetsHref(), directory);
    path = joinWithSlash(path, namespace);
    path = joinWithSlash(path, `${name}.svg`);
    return sanitizer.bypassSecurityTrustResourceUrl(path);
  };
}
