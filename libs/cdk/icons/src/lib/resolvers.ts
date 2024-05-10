import { Location } from '@angular/common';
import { IconResolver } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface SvgIconResolverConfig {
  location: Location;
  sanitizer: DomSanitizer;
  directory: string;
}

export function createSvgIconResolver(config: SvgIconResolverConfig): IconResolver {
  const { location, sanitizer, directory } = config;
  return (name, namespace) => {
    if (!isValidPathSegment(name) || !isValidPathSegment(namespace)) {
      return null;
    }

    const path = joinPath(directory, namespace, name) + '.svg';
    const url = location.prepareExternalUrl(path);
    return sanitizer.bypassSecurityTrustResourceUrl(url);
  };
}

function isValidPathSegment(segment: string): boolean {
  return /^[\w\-$]+$/.test(segment);
}

function joinPath(...segments: string[]): string {
  return segments.join('/').replace(/\/{2,}/g, '/');
}
