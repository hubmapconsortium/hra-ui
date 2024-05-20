import { Location } from '@angular/common';
import { IconResolver } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/** Configuration for a svg icon resolver */
export interface SvgIconResolverConfig {
  /** Location service used to resolve urls */
  location: Location;
  /** Sanitizer to create resource urls */
  sanitizer: DomSanitizer;
  /** Base directory of icons and namespace folders */
  directory: string;
}

/**
 * Creates svg icon resolver with the specified configuration.
 * The function resolves all svg icons to `directory/[namespace/]name.svg`
 *
 * @param config Configuration object
 * @returns A resolver function
 */
export function createSvgIconResolver(config: SvgIconResolverConfig): IconResolver {
  const { location, sanitizer, directory } = config;
  return (name, namespace) => {
    const path = joinPath(directory, namespace, name) + '.svg';
    const url = location.prepareExternalUrl(path);
    return sanitizer.bypassSecurityTrustResourceUrl(url);
  };
}

/**
 * Joins path segments into a single string. Removes empty segments and double '/' sequences.
 *
 * @param segments Segments, some of which may be the empty string
 * @returns The joined path
 */
function joinPath(...segments: string[]): string {
  return segments.join('/').replace(/\/{2,}/g, '/');
}
