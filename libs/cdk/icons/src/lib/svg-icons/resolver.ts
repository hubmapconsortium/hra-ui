import { assertInInjectionContext, inject } from '@angular/core';
import { IconResolver, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIconNamespaceService } from './namespace.service';
import { Location } from '@angular/common';

/**
 * Creates an icon resolver that uses the `SvgIconNamespaceService` to determine
 * the url for a svg icon.
 * Must be called in an injection context.
 *
 * @returns An icon resolver that can be registered with `MatIconRegistry`
 */
export function createSvgIconResolver(): IconResolver {
  assertInInjectionContext(createSvgIconResolver);

  const namespaceService = inject(SvgIconNamespaceService);
  const sanitizer = inject(DomSanitizer);
  return (name, namespace) => {
    const base = namespaceService.resolveNamespaceDirectory(namespace);
    const url = Location.joinWithSlash(base, name + '.svg');
    return sanitizer.bypassSecurityTrustResourceUrl(url);
  };
}

/**
 * Creates and registers an icon resolver with `MatIconRegistry`.
 * Must be called in an injection context.
 */
export function registerSvgIconResolver(): void {
  assertInInjectionContext(registerSvgIconResolver);
  inject(MatIconRegistry).addSvgIconResolver(createSvgIconResolver());
}
